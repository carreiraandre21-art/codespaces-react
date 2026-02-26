const auditRepository = require('../repositories/auditRepository');

const registerAudit = (payload) => auditRepository.createAudit(payload);

module.exports = { registerAudit };
