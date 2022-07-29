const { Style, UserStyle } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const newId = req.body?.id;
    const style = await Style.findByPk(newId);

    const similarStyles = await Style.findAll({
      where: {
        typeOfPiece: style.typeOfPiece,
        pieceColor: style.pieceColor,
      },
    });

    const similarStyleIds = similarStyles.map((style) => style.id);

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
      where: {
        UserId: req.user.id,
        StyleId: newId,
      },
    });

    userStyle.set({ isSelected: true });
    userStyle.save();

    return res.json({ userStyle });
  } catch (e) {
    console.log(e);
  }
};
