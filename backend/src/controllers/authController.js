const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const data = await authService.registerParentAndStudent(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const data = await authService.forgotPassword(req.body);
  return res.json(data);
};

module.exports = { register, login, forgotPassword };
