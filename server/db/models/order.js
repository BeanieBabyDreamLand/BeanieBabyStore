const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderedAt: {
    type: Sequelize.DATE
  }
})

module.exports = Order
