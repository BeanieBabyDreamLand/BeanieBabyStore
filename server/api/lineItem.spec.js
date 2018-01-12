const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { LineItem } = require('../db/models')

describe('Line Items routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/lineItems/', () => {


        it( 'POST /api/lineItems', () => {
            return request(app)
                .post('/api/lineItems')
                .send({
                    price: '1000.00',
                    quantity: '5'
                })
                .expect(200)
                .then(res => {
                    console.log(res.data)
                })
        })
    })
})