const Sequelize = require('sequelize')
const testdb = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/beaniebaby_test', {
    logging: false
  }
)

module.exports = testdb
