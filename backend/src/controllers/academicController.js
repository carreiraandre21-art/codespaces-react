const academicService = require('../services/academicService');

const createAbsence = async (req, res) => {
  try {
    const data = await academicService.createAbsence(req.user, req.body);
    return res.status(201).json(data);
  } catch (error) {
    const status = error.code === 'P2003' ? 400 : 500;
    return res.status(status).json({ message: error.message || 'Erro ao registrar falta.' });
  }
};

const createGrade = async (req, res) => {
  try {
    const data = await academicService.createGrade(req.user, req.body);
    return res.status(201).json(data);
  } catch (error) {
    const status = error.code === 'P2003' ? 400 : 500;
    return res.status(status).json({ message: error.message || 'Erro ao lançar nota.' });
  }
};

const createActivity = async (req, res) => {
  try {
    const data = await academicService.createActivity(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Erro ao criar atividade.' });
  }
};

const createExam = async (req, res) => {
  try {
    const data = await academicService.createExam(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Erro ao criar prova.' });
  }
};

const createOccurrence = async (req, res) => {
  try {
    const data = await academicService.createOccurrence(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Erro ao criar ocorrência.' });
  }
};

const dashboard = async (req, res) => {
  try {
    const studentId = Number(req.params.studentId);
    const data = await academicService.getStudentSummary(studentId);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Erro ao carregar dashboard.' });
  }
};

const studentData = async (req, res) => {
  try {
    const studentId = Number(req.params.studentId);
    const data = await academicService.listByStudent(studentId);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Erro ao carregar dados do aluno.' });
  }
};

module.exports = {
  createAbsence,
  createGrade,
  createActivity,
  createExam,
  createOccurrence,
  dashboard,
  studentData
};
