const sequelize = require('../database')

const Catalog = require('./catalog')
const Product = require('./product')
const User = require('./user')
const News = require('./news')
const Newsletter = require('./newsletter')
const Feedback = require('./feedback')

module.exports = {
  sequelize,
  Catalog,
  Product,
  User,
  News,
  Newsletter,
  Feedback
};