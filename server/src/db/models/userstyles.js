'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userStyles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Style }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Style, { foreignKey: 'styleId' });
    }
  }
  userStyles.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      styleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isSelected: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'userStyles',
    }
  );
  return userStyles;
};
