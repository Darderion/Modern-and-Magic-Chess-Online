'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.hasMany(User, { foreignKey: 'chatStyleId' });
    }
  }
  chatStyle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fontColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      backColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'chatStyle',
      modelName: 'ChatStyle',
    }
  );
  return chatStyle;
};
