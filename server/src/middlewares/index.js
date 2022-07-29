const { json } = require('express');
const allowWorkWithWeb = require('./allowWorkWithWeb');
const disablePoweredBy = require('./disablePoweredBy');
const requestID = require('./requestID');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const rateLimiter = require('express-rate-limit');
const slowDown = require('express-slow-down');
module.exports = (app) => {
  app.use(allowWorkWithWeb);
  app.use(json());
  app.use(cors());
  app.use(cookieParser());
  app.use(disablePoweredBy);

  const limiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 120,
  });

  const speedLimiter = slowDown({
    windowMs: 60 * 1000,
    delayAfter: 100,
    delayMs: 1000,
  });

  app.use(speedLimiter);
  app.use(limiter);

  app.use(requestID);
  app.use(logger);
};
