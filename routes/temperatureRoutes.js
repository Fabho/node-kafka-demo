const express = require('express');

const { getFahrenheitTemperature } = require('../controllers/temperatureController');
const router = express.Router();

router
  .route('/:id')
  .get(getFahrenheitTemperature);

module.exports = router;