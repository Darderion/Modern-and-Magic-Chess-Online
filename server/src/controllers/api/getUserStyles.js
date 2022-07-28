const { UserStyle } = require('../../db/models');
const { ApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res) => {
  const where = {
    UserId: req.user.id,
  };
  if (req?.body?.isSelected) where.isSelected = req.body.isSelected;

  try {
    return res.json({
      styles: await UserStyle.findAll({ where }),
    });
  } catch (e) {
    return new ApiError(500, e.message).sendResponse(res);
  }
};
