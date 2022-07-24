const { BadRequestApiError } = require('../../validators/errors/ApiError');
module.exports = async (req, res) => {
  if (!req.cookies || !req.cookies[process.env.COOKIE_NAME])
    return BadRequestApiError('Refresh token is not provided');
  res.clearCookie([process.env.COOKIE_NAME]);
  return res.json({ message: 'Successfully logout' });
};
