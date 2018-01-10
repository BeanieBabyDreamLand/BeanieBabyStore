/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Baby } = require('../db/models')

console.log(Baby)

describe('Baby routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/babies/', () => {
        const babyName1 = 'bernie'
        const babyName2 = 'bones'

        beforeEach(() => {
            return Baby.create({
                name: babyName1,
                poem: 'This little dog can\'t wait to grow, To rescue people lost in the snow, Don\'t let him out-keep him on your shelf, He doesn\'t know how to rescue himself!',
                price: '1000.00',
                inventory_qty: '5',
                imageUrl: 'http://www.tycollector.com/beanies/bb-images/bernie.jpg',
                category: 'common'
            }),
                Baby.create({
                    name: babyName2,
                    poem: 'Bones is a dog that loves to chew, Chairs and tables and a smelly old shoe, “You’re so destructive” all would shout, But that all stopped, when his teeth fell out',
                    price: '1800.00',
                    inventory_qty: '20',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71E25QZTEVL.gif',
                    category: 'common'
                })
        })

        it('GET /api/babies', () => {
            return request(app)
                .get('/api/babies')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(babyName1)
                })
        })

        it('GET /api/babies/2', () => {
            return request(app)
                .get('/api/babies/2')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(babyName2)
                })
        })

        it('POST /api/babies', () => {
            return request(app)
                .post('/api/babies')
                .send({
                    name: babyName1,
                    poem: 'This little dog can\'t wait to grow, To rescue people lost in the snow, Don\'t let him out-keep him on your shelf, He doesn\'t know how to rescue himself!',
                    price: '1000.00',
                    inventory_qty: '5',
                    imageUrl: 'http://www.tycollector.com/beanies/bb-images/bernie.jpg',
                    category: 'common'
                })
                .expect(409)
                .then(res => {
                    expect(res.text).to.be.equal('That Baby is already home')
                })
        })

        it('PUT /api/babies', () => {
            return request(app)
                .post('/api/babies')
                .send({
                    name: ,
                    poem: 'This little dog can\'t wait to grow, To rescue people lost in the snow, Don\'t let him out-keep him on your shelf, He doesn\'t know how to rescue himself!',
                    price: '1000.00',
                    inventory_qty: '5',
                    imageUrl: 'http://www.tycollector.com/beanies/bb-images/bernie.jpg',
                    category: 'common'
                })
                .expect(409)
                .then(res => {
                    expect(res.text).to.be.equal('That Baby is already home')
                })
        })
        //we need to create a 201 status created for our posts
    }) // end describe('/api/babies')
}) 