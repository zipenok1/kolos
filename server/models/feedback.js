const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Feedback = sequelize.define('feedback', {
  id_feedback: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_feedback'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'feedback',
  timestamps: false
});

module.exports = Feedback