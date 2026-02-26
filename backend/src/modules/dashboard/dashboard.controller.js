const { z } = require('zod');
const asyncHandler = require('../../utils/asyncHandler');
const dashboardService = require('../../services/dashboardService');

const studentIdSchema = z.object({ params: z.object({ studentId: z.string().uuid() }) });

const responsibleDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getResponsibleDashboard({
    schoolId: req.schoolId,
    studentId: req.params.studentId
  });
  res.json(data);
});

const studentHistory = asyncHandler(async (req, res) => {
  const data = await dashboardService.getStudentHistory({ schoolId: req.schoolId, studentId: req.params.studentId });
  res.json(data);
});

module.exports = { responsibleDashboard, studentHistory, studentIdSchema };
