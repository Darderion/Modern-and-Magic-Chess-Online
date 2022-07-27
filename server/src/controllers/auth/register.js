const {
  BadRequestApiError,
  ApiError,
} = require('../../validators/errors/ApiError');
const { User } = require('../../db/models');
const hashPassword = require('../../util/hashPassword');
module.exports = async (req, res) => {
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

  if (user) {
    return new ApiError(409, 'User already exists').sendResponse(res);
  }

  const [passwordHash, salt] = hashPassword(req.body.password);
  try {
    const newUser = await User.create({
      nick: req.body.nick,
      passwordHash,
      salt,
    });
    req.user = { id: newUser.id };
    return res.json(req.user);
  } catch (e) {
    new ApiError(500, e.message).sendResponse(res);
  }
};
