const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const wordCheckRoutes = require('./api/routes/wordCheck');
app.use('/word-check', wordCheckRoutes);

module.exports = app;