const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const News = sequelize.define('news', {
  id_news: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_news'
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  img: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'news',
  timestamps: false
});

module.exports = News