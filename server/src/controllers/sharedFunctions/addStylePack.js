const { Style, UserStyle } = require('../../db/models');

module.exports = async (userId, packName, isSelected = false) => {
  const styles = await Style.findAll({
    where: {
      packName: packName,
    },
  });
  styles.forEach(style => {
    UserStyle.create({
      StyleId: style.id,
      UserId: userId,
      isSelected: isSelected,
    });
  });
}