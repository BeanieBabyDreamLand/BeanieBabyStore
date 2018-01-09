const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  orderedAt: {
    type: Sequelize.DATE
  }
})

module.exports = Order
