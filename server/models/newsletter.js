const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Newsletter = sequelize.define('newsletter', {
  id_newsletter: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_newsletter'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'newsletter',
  timestamps: false
});

module.exports = Newsletter