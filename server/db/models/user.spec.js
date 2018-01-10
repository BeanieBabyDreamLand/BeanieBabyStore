/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  /* clear the database and recreate the tables before beginning a run */
  before(() => {
    return db.sync({force: true})
  })

  /* create an un-saved user instance before every spec */
  var user;
  beforeEach(() => {
    user = User.build({
      email: 'testing@test.com',
      password: 'aBadPassword',
      firstname: 'Test',
      lastname: 'ing'
    })
  })

  /* empty the tables after each spec */
  afterEach(() => {
    return Promise.all([
      User.truncate({ cascade:true })
    ])
  })

  describe('user attributes', function () {
    it('has `email`, `password`, `firstname`, `lastname`, and `fullname` fields', function () {
      return user.save()
      .then(function (savedUser) {
        expect(savedUser.email).to.equal('testing@test.com')
        expect(savedUser.password).to.equal('aBadPassword')
        expect(savedUser.firstname).to.equal('Test')
        expect(savedUser.lastname).to.equal('ing')
        expect(savedUser.fullname).to.equal('Test ing')
      })
    })

    it('has validate `email` field', function () {
      user.email = 'notAnEmail'

      return user.validate()
      .then(function () {
        throw new Error('validation should fail because `notAnEmail` is not a valid email address')
      },
      function (result) {
        expect(result).to.be.an.instanceOf(Error)
      })
    })
    // it ('return `firstname` + ` ` + `lastname', function () {

    // })

  }) // end describe ('user should have all attributes')

  // describe('`fullname` virtual field', function () {


  // })

})
