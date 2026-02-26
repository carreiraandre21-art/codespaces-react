module.exports = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse({ body: req.body, query: req.query, params: req.params });
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    const err = new Error(message);
    err.statusCode = 422;
    return next(err);
  }
  req.validated = parsed.data;
  return next();
};
