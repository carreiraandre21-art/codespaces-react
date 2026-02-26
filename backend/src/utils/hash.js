const bcrypt = require('bcrypt');

const hashPassword = (value) => bcrypt.hash(value, 12);
const comparePassword = (raw, hash) => bcrypt.compare(raw, hash);

module.exports = { hashPassword, comparePassword };
