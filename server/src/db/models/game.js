'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({History}) {
      this.hasMany(History, {foreignKey: 'gameId'});
    }
  }
  Game.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTime: DataTypes.TIME,
    finishTime: DataTypes.TIME,
    isFinished: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    winnerId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'game',
    modelName: 'Game',
  });
  return Game;
};