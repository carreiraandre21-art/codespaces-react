const dashboardRepository = require('../repositories/dashboardRepository');
const academicRepository = require('../repositories/academicRepository');
const { getCache, setCache } = require('./cacheService');

const buildSummary = (data) => {
  const average = data.grades.length ? data.grades.reduce((sum, g) => sum + g.value, 0) / data.grades.length : 0;

  const performanceBySubject = Object.values(
    data.grades.reduce((acc, g) => {
      const key = g.subject.name;
      acc[key] = acc[key] || { subject: key, values: [] };
      acc[key].values.push(g.value);
      return acc;
    }, {})
  ).map((item) => ({
    subject: item.subject,
    average: Number((item.values.reduce((s, v) => s + v, 0) / item.values.length).toFixed(2))
  }));

  return {
    mediaGeral: Number(average.toFixed(2)),
    faltasMes: data.absences.length,
    proximasProvas: data.exams,
    atividadesPendentes: data.activities,
    ultimasOcorrencias: data.occurrences,
    graficoDesempenho: performanceBySubject,
    riscoAcademico: average < 6
  };
};

const getResponsibleDashboard = async ({ schoolId, studentId }) => {
  const cacheKey = `dashboard:${schoolId}:${studentId}`;
  const cached = await getCache(cacheKey);
  if (cached) return JSON.parse(cached);

  const data = await dashboardRepository.getDashboard(schoolId, studentId);
  const summary = buildSummary(data);
  await setCache(cacheKey, JSON.stringify(summary), 180);
  return summary;
};

const getStudentHistory = async ({ schoolId, studentId }) => {
  return academicRepository.listStudentData({ schoolId, studentId });
};

module.exports = { getResponsibleDashboard, getStudentHistory };
