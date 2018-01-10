const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fullname: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.firstname + ' ' + this.lastname
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  googleId: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
})

module.exports = User
