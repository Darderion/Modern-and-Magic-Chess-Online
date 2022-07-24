const { ApiError } = require('../validators/errors/ApiError');
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  const user = req.user;
  if (!user) new ApiError(400, 'User must be provided').sendResponse(res);
  try {
    const accessToken = jwt.sign(
      { id: req.user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};
