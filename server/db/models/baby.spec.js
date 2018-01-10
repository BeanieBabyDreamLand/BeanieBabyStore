/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Baby = db.model('baby')

describe('Baby model', () => {
  /* clear the database and recreate the tables before beginning a run */
  before(() => {
    return db.sync({force: true})
  })

  /* create an un-saved user instance before every spec */
  let baby;
  beforeEach(() => {
    baby = Baby.build({
      name: 'Iggy the Iguana',
      poem: `Sitting on a rock, basking in the sun, \n Is this iquana’s idea of fun. \n Towel and glasses, book and beach chair, \n His life is so perfect, without a care.`,
      price: 999.99,
      inventory_qty: 5,
      category: 'unicorn'
    })
  })
    /* empty the tables after each spec */
    afterEach(() => {
      return Promise.all([
        Baby.truncate({ cascade: true })
      ])
    })
    describe('baby attributes', function () {
      it(`has 'name', 'poem', 'price', 'inventory_qty', and 'category' attributes`, function() {
        return baby.save()
        .then(function (savedUser) {
          expect(savedUser.name).to.equal('Iggy the Iguana')
          expect(savedUser.poem).to.equal(`Sitting on a rock, basking in the sun, \n Is this iquana’s idea of fun. \n Towel and glasses, book and beach chair, \n His life is so perfect, without a care.`)
          expect(savedUser.price).to.equal('999.99')
          expect(savedUser.inventory_qty).to.equal(5)
          expect(savedUser.category).to.equal('unicorn')
        })
      })
      it(`should fail if the baby does not have a name`, function() {
        baby.name = null
        return baby.save()
          .then(function(){
            throw new Error('baby must have a name')
          },
         function (result){
          expect(result).to.be.an.instanceOf(Error)
        })
      })
      it(`should fail if the baby does not have a poem`, function() {
        baby.poem = null
        return baby.save()
          .then(function(){
            throw new Error('baby must have a poem')
          },
         function (result){
          expect(result).to.be.an.instanceOf(Error)
        })
      })
      it(`should fail if the baby does not have a price`, function() {
        baby.price = null
        return baby.save()
          .then(function(){
            throw new Error('baby must have a price')
          },
         function (result){
          expect(result).to.be.an.instanceOf(Error)
        })
      })
      it(`should fail if the baby does not have a inventory_qty`, function() {
        baby.inventory_qty = null
        return baby.save()
          .then(function(){
            throw new Error('baby must have a inventory_qty')
          },
         function (result){
          expect(result).to.be.an.instanceOf(Error)
        })
      })
    })
})
