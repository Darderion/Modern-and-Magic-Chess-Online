'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LootboxStyles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Lootbox, Style }) {
      LootboxStyles.belongsTo(Lootbox, { foreignKey: 'lootboxId' });
      LootboxStyles.belongsTo(Style, { foreignKey: 'styleId' });
    }
  }
  LootboxStyles.init(
    {
      lootboxId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      styleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'lootboxStyles',
      modelName: 'LootboxStyles',
    }
  );
  return LootboxStyles;
};
