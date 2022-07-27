'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate({ User }) {
      Game.belongsTo(User, { foreignKey: 'whitePiecesUserId' });
      Game.belongsTo(User, { foreignKey: 'blackPiecesUserId' });
    }
  }

  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      whitePiecesUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      blackPiecesUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: DataTypes.STRING, //iso 8601
      finishTime: DataTypes.STRING,
      isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      result: DataTypes.ENUM('draw', 'black', 'white'),
    },
    {
      sequelize,
      tableName: 'game',
      modelName: 'Game',
    }
  );
  return Game;
};
