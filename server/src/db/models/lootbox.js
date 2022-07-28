'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lootbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ LootboxStyles }) {
      Lootbox.hasMany(LootboxStyles, { foreignKey: 'lootboxId' });
    }
  }
  Lootbox.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'lootbox',
      modelName: 'Lootbox',
    }
  );
  return Lootbox;
};
