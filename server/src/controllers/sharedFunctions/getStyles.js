const { Style } = require('../../db/models');
const { ApiError } = require('../../validators/errors/ApiError');

module.exports = async (options) => {
  const where = {};
  if (options?.id) where.id = options.id;
  if (options?.pieceColor) where.pieceColor = options.pieceColor;
  if (options?.typeOfPiece) where.typeOfPiece = options.typeOfPiece;
  if (options?.packName) where.packName = options.packName;
  try {
    return {
      styles: await Style.findAll({
        where,
      }),
    };
  } catch (e) {
    throw new ApiError(500, e.message);
  }
};
