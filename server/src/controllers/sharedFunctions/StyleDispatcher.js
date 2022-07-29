const { Style } = require('../../db/models');
const { ApiError } = require('../../validators/errors/ApiError');

class StyleDispatcher {
  constructor() {}

  async getStyles(searchOptions) {
    const where = {};

    if (searchOptions.id) where.id = searchOptions.id;
    if (searchOptions.pieceColor) where.pieceColor = searchOptions.pieceColor;
    if (searchOptions.typeOfPiece)
      where.typeOfPiece = searchOptions.typeOfPiece;
    if (searchOptions.packName) where.packName = searchOptions.packName;

    try {
      const foundStyles = await Style.findAll({
        where,
      });

      return {
        success: true,
        styles: foundStyles,
        error: null,
      };
    } catch (e) {
      return {
        success: false,
        styles: null,
        error: new ApiError(500, e.message),
      };
    }
  }
}

module.exports = new StyleDispatcher();
