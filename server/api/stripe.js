const router = require('express').Router()
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
router.post('/order', (req, res, next) => {
  let {address} = req.body
  //first find user by email then create order;

  stripe.orders.create({
    currency: 'usd',
    shipping: address
  }, function(err, order){
    if (err) console.err('err is ', err)
    else console.log('order is ', order)
  })
})
