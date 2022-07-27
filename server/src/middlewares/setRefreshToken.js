const { ApiError } = require('../validators/errors/ApiError');
const jwt = require('jsonwebtoken');
const { env } = require('../config');
module.exports = async (req, res, next) => {
  const user = req.user;
  if (!user) new ApiError(400, 'User must be provided').sendResponse(res);
  try {
    const refreshToken = jwt.sign(
      { userId: user.userId },
      env.refreshTokenSecret,
      {
        expiresIn: env.refreshTokenExpTime,
      }
    );

    res.cookie(env.cookieName, refreshToken, {
      httpOnly: true,
      secure: env.isSecureCookies,
      sameSite: 'none',
    });
    next();
  } catch (e) {
    next(e);
  }
};
