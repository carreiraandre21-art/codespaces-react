module.exports = (_req, res) => {
  res.status(404).json({ message: 'Rota nao encontrada' });
};
