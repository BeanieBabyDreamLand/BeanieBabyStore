const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 1
    }
  },
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [15, 240]
    }
  }
})

module.exports = Review
