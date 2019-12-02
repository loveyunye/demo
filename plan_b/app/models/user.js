const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class Users extends Model {}

Users.init(
  {
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    account: {
      type: Sequelize.STRING(128),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(128),
      allowNull: true,
    },
    avatar: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'user_t',
    modelName: 'user',
    underscored: true,
  },
);

module.exports = Users;
