const jwt = require('jsonwebtoken');
const {
  BadRequestApiError,
  ApiError,
} = require('../validators/errors/ApiError');
const { env } = require('../config');
module.exports = async (req, res, next) => {
  if (!req.headers.authorization)
    return new BadRequestApiError(
      'No access auth header provided'
    ).sendResponse(res);
  /* if (!req.cookies || !req.cookies[env.cookieName])
    return new BadRequestApiError('No refresh token provided').sendResponse(
      res
    ); */ // TODO use refresh later

  const [method, accessToken] = req.headers.authorization.split(' ');
  if (method !== 'Bearer' || !accessToken)
    return new BadRequestApiError('No access bearer token').sendResponse(res);

  try {
    const decodedPayload = jwt.verify(accessToken, env.accessTokenSecret);
    if (!decodedPayload) {
      return new BadRequestApiError('Invalid access token').sendResponse(res);
    }
    req.user = decodedPayload;
    next();
  } catch (e) {
    return new ApiError(
      401,
      'Access token has been expired. Please refresh it'
    ).sendResponse(res);
  }
};
