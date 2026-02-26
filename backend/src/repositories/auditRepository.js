const prisma = require('../config/prisma');

const createAudit = (data) => prisma.auditLog.create({ data });
const listAudits = ({ schoolId, skip, take }) => prisma.auditLog.findMany({ where: { schoolId }, orderBy: { createdAt: 'desc' }, skip, take });
const countAudits = ({ schoolId }) => prisma.auditLog.count({ where: { schoolId } });

module.exports = { createAudit, listAudits, countAudits };
