const { Style, UserStyle } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
  try {
    const style = await Style.findByPk(req.params.id);

    const similarStyles = await Style.findAll({
      where: {
        typeOfPiece: style.typeOfPiece,
        pieceColor: style.pieceColor,
      },
    });

    let similarStyleIds;
    await Promise.all(similarStyles.map((style) => style.id)).then((arr) => {
      similarStyleIds = arr;
    });

    const selectedSimilarUserStyle = await UserStyle.findOne({
      where: {
        StyleId: {
          [Op.in]: similarStyleIds,
        },
        UserId: req.user.id,
        isSelected: true,
      },
    });

    if (selectedSimilarUserStyle !== null) {
      selectedSimilarUserStyle.set({ isSelected: false });
      await selectedSimilarUserStyle.save();
    }

    const userStyle = await UserStyle.findOne({
      UserId: req.user.id,
      StyleId: style.id,
    });
    userStyle.set({ isSelected: true });
    userStyle.save();

    return res.json({ style });
  } catch (e) {
    console.log(e);
  }
};
