const academicService = require('../services/academicService');

const createAbsence = async (req, res) => {
  const data = await academicService.createAbsence(req.user.id, req.body);
  res.status(201).json(data);
};

const createGrade = async (req, res) => {
  const data = await academicService.createGrade(req.user.id, req.body);
  res.status(201).json(data);
};

const createActivity = async (req, res) => {
  const data = await academicService.createActivity(req.user.id, req.body);
  res.status(201).json(data);
};

const createExam = async (req, res) => {
  const data = await academicService.createExam(req.user.id, req.body);
  res.status(201).json(data);
};

const createOccurrence = async (req, res) => {
  const data = await academicService.createOccurrence(req.user.id, req.body);
  res.status(201).json(data);
};

const dashboard = async (req, res) => {
  const studentId = Number(req.params.studentId);
  const data = await academicService.getStudentSummary(studentId);
  res.json(data);
};

const studentData = async (req, res) => {
  const studentId = Number(req.params.studentId);
  const data = await academicService.listByStudent(studentId);
  res.json(data);
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
