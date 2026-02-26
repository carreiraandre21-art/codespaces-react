const express = require('express');
const crypto = require('crypto');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const env = require('./config/env');
const apiLimiter = require('./middlewares/rateLimiter');
const requestLogger = require('./middlewares/requestLogger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(apiLimiter);
app.use(requestLogger);

app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
