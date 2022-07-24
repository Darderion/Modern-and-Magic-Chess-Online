const {
  BadRequestApiError,
  NotFoundApiError,
  ApiError,
} = require('../../validators/errors/ApiError');
const isValidPassword = require('../../util/isValidPassword');
const { User } = require('../../db/models');
module.exports = async (req, res, next) => {
  if (!req.body || !req.body.password || !req.body.nick) {
    return new BadRequestApiError(
      'Request body should contains password and nick fields'
    ).sendResponse(res);
  }
  const user = await User.findOne({
    where: {
      nick: req.body.nick,
    },
  });

  if (!user) {
    return new NotFoundApiError('User not found').sendResponse(res);
  }

  if (!isValidPassword(req.body.password, user.passwordHash, user.salt)) {
    return new ApiError(403, 'Wrong credentials').sendResponse(res);
  }

  req.user = { id: user.id, nick: user.nick };
  next();
};
