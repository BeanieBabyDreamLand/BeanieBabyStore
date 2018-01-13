const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/babies', require('./babies'))
router.use('/orders', require('./orders'))
router.use('/lineItems', require('./lineItem'))
router.use('/reviews', require('./reviews'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
