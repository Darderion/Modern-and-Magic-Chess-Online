const { ApiError } = require('../validators/errors/ApiError');
const jwt = require('jsonwebtoken');
const { env } = require('../config');
module.exports = async (req, res, next) => {
  const user = req.user;
  if (!user) new ApiError(400, 'User must be provided').sendResponse(res);
  try {
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.cookie(process.env.COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: env.isSecureCookies,
      sameSite: 'none',
    });
    next();
  } catch (e) {
    next(e);
  }
};
