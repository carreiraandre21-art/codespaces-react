const prisma = require('../config/prisma');

const listSchools = ({ skip, take }) => prisma.school.findMany({ orderBy: { createdAt: 'desc' }, skip, take });
const countSchools = () => prisma.school.count();
const createSchool = (data) => prisma.school.create({ data });
const updateSchool = (id, data) => prisma.school.update({ where: { id }, data });

module.exports = { listSchools, countSchools, createSchool, updateSchool };
