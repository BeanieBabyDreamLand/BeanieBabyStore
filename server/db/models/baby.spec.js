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
      it(`has '`)
    })
})
