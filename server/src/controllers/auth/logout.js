const { BadRequestApiError } = require('../../validators/errors/ApiError');
const { env } = require('../../config');
module.exports = async (req, res) => {
  if (!req.cookies || !req.cookies[env.cookieName])
    return new BadRequestApiError('Refresh token is not provided').sendResponse(
      res
    );
  res.clearCookie([env.cookieName]);
  return res.json({ message: 'Successfully logout' });
};
