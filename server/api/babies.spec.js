/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Baby } = require('../db/models')

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
            // ,
            //     Baby.create({
            //         name: 'Mystic',
            //         poem: 'Once upon a time in a land far away, A baby unicorn was born one day in May, Keep Mystic with you she\'s a prize, You\'ll see the magic in her blue eyes.',
            //         price: '5000.00',
            //         inventory_qty: '1',
            //         imageUrl: 'http://www.tycollector.com/beanies/bb-images/bernie.jpg',
            //         category: 'rare'
            // })
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
                    name: 'Mystic',
                    poem: 'Once upon a time in a land far away, A baby unicorn was born one day in May, Keep Mystic with you she\'s a prize, You\'ll see the magic in her blue eyes.',
                    price: '5000.00',
                    inventory_qty: '1',
                    imageUrl: 'http://www.tycollector.com/beanies/bb-images/bernie.jpg',
                    category: 'unicorn'
                })
                .expect(201)
                .then(res => {
                    expect(res.body.name).to.be.equal('Mystic')
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
                    name: 'Mystic',
                    poem: 'Once upon a time in a land far away, A baby unicorn was born one day in May, Keep Mystic with you she\'s a prize, You\'ll see the magic in her blue eyes.',
                    price: '5000.00',
                    inventory_qty: '500',
                    imageUrl: 'http://www.tycollector.com/beanies/bb-images/bernie.jpg',
                    category: 'rare'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.category).to.equal('rare');
                    expect(res.body.inventory_qty).to.equal(500)
                })
            //we need to create a 201 status created for our posts
        }) // end describe('/api/babies')

        it('DELETE /api/babies', () => {
            return request(app)
                .delete('/api/babies/3')
                .expect(204)
        })
    })
})