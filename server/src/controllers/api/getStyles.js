const { Style } = require('../../db/models');
const { ApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  const where = {};
  if (req?.body?.id) where.id = req.body.id;
  if (req?.body?.pieceColor) where.pieceColor = req.body.pieceColor;
  if (req?.body?.typeOfPiece) where.typeOfPiece = req.body.typeOfPiece;
  if (req?.body?.packName) where.packName = req.body.packName;
  try {
    return res.json({
      styles: await Style.findAll({
        where,
      }),
    });
  } catch (e) {
    return new ApiError(500, e.message).sendResponse(res);
  }
};
