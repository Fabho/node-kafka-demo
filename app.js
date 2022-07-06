const express = require('express');

const temperatureRouter = require('./routes/temperatureRoutes');
const app = express();

app.use(express.json({
  limit: '10kb'
}));

app.use('/api/temperature', temperatureRouter);

module.exports = app;