const Sequelize = require('sequelize')
const db = require('../db')

const Baby = db.define('baby', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  poem: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  inventory_qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://typeset-beta.imgix.net/lovelace/uploads/367/44d076f0-d354-0133-8308-06e18a8a4ae5.png',
    validate: {
      isUrl: true
    }
  },
  category: {
    type: Sequelize.ENUM,
    values: ['rare', 'common', 'unicorn']
  }
})

// address out of stock inventory
