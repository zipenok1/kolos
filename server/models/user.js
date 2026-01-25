const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const User = sequelize.define('user', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_user'
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User