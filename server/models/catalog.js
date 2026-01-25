const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Catalog = sequelize.define('catalog', {
  id_catalog: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_catalog'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  img: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'catalog',
  timestamps: false
});

module.exports = Catalog