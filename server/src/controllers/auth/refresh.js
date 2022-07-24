const {
  ApiError,
  BadRequestApiError,
} = require('../../validators/errors/ApiError');
const jwt = require('jsonwebtoken');
const { env } = require('../../config');
module.exports = async (req, res, next) => {
  if (!req.cookies[env.cookieName]) {
    return new ApiError(403, 'Refresh token is not provided').sendResponse(res);
  }
  try {
    const decodedPayload = jwt.verify(
      req.cookies[env.cookieName],
      env.refreshTokenSecret
    );

    if (!decodedPayload) {
      return new BadRequestApiError(
        'Invalid refresh token. Please logout'
      ).sendResponse(res);
    }
    req.user = decodedPayload;
    next();
  } catch (e) {
    return new ApiError(
      401,
      'Refresh token has been expired. Please logout'
    ).sendResponse(res);
  }
};
