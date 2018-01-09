/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Baby } = require('../db/models')

console.log(Baby)

describe('Baby routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/babies/', () => {
    const babyName  = 'bernie'

    beforeEach(() => {
      return Baby.create({
        name: babyName,
        poem: 'roses are red, violets are blue',
        price: '1000.00',
        inventory_qty: '5',
        imageUrl: 'https://files.slack.com/files-tmb/T024FPYBQ-F8P2E7EP2-e9363220dd/image_720.png',
        category: 'common'
    })
    })

    it('GET /api/babies', () => {
      return request(app)
        .get('/api/babies')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(babyName)
        })
    })
  }) // end describe('/api/babies')
}) // end describe('User routes')