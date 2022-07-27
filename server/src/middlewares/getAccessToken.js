const { ApiError } = require('../validators/errors/ApiError');
const jwt = require('jsonwebtoken');
const { env } = require('../config');
module.exports = async (req, res, next) => {
  const user = req.user;
  if (!user) new ApiError(400, 'User must be provided').sendResponse(res);
  try {
    const accessToken = jwt.sign({ id: req.user.id }, env.accessTokenSecret, {
      expiresIn: env.accessTokenExpTime,
    });

    res.json({
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};
