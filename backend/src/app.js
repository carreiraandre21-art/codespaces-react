const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const academicRoutes = require('./routes/academicRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api', academicRoutes);

module.exports = app;
