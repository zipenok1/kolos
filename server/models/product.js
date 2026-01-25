const { DataTypes } = require('sequelize')
const sequelize = require('../database')
const Catalog = require('./catalog')

const Product = sequelize.define('product', {
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_product'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  img: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  id_catalog: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Catalog,
      key: 'id_catalog'
    }
  }
}, {
  tableName: 'product',
  timestamps: false
});

Product.belongsTo(Catalog, { foreignKey: 'id_catalog' })
Catalog.hasMany(Product, { foreignKey: 'id_catalog' })

module.exports = Product