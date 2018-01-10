/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
<<<<<<< HEAD
        email: codysEmail,
        firstname: 'cody',
        lastname: 'dog',
        password: 'asdfg'
=======
        email: 'codysEmail@dog.com',
        firstname: 'cody',
        lastname: 'dog',
        password: 'pug'
>>>>>>> ee2faeb992104b7246f0f891e99d85bbe4a82895
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
    it('GET /api/users/:id', () =>{
      return request(app)
      .get('/api/users/1')
      // .send({
      //   id: 1,
      //   email: codysEmail,
      //   firstname: 'cody',
      //   lastname: 'dog',
      //   fullname: 'cody dog'
      // })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.equal(1)
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
