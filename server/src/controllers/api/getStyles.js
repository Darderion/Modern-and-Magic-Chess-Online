const { getStyles } = require('../sharedFunctions/getStyles');

module.exports = async (req, res) => {
  const where = {};
  if (req?.body?.id) where.id = req.body.id;
  if (req?.body?.pieceColor) where.pieceColor = req.body.pieceColor;
  if (req?.body?.typeOfPiece) where.typeOfPiece = req.body.typeOfPiece;
  if (req?.body?.packName) where.packName = req.body.packName;
  try {
    return res.json({ styles: await getStyles(where) });
  } catch (e) {
    return e.sendResponse(res);
  }
};
