const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//create a new customer
router.post('/customer', (req, res, next) => {
  let {name, email} = req.body
  stripe.customers.create({
    description: name,
    source: 'tok_visa',
    email: email
  }, function(err, customer){
    if (err) console.err('err is ', err)
    else console.log('customer is ', customer)
  })
})

// address will look like:
// address: {
//   line1: '1234 Main Street',
//   city: 'San Francisco',
//   state: 'CA',
//   country: 'US',
//   postal_code: '94111'
// }

//create a new order
//need to pass address object from form and userId from cart[0].order.userId
router.post('/order', (req, res, next) => {
  let {address, userId} = req.body
  //first find user by id and get stripeId then create order
  User.findOne({
    where: { id: userId }
  })
  .then(user => {
    const stripeId = user.stripeId
    stripe.orders.create({
      currency: 'usd',
      shipping: address,
      customer: stripeId
    }, function(err, order){
      if (err) console.err('err is ', err)
      else console.log('order is ', order)
    })
  })
})
