const router = require('express').Router()
const {Order, User, LineItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
      include: [{model:User, as:'user'}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  Order.findAll( {
      where: { id: orderId }, 
      include: [{ model: User, as:'User'},
                {model:LineItem, as:'lineitem'}]
    } )
    .then(orders => res.json(orders))
    .catch(next)
})
//stopped here 1/8/18
//just for admins
router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: { name: req.body.name }
  })
    .then(arr => {
      if (arr[1]) {
        res.send(arr[0])
      }
      else {
        let err = new Error('')
        err.status = 409
        next(err)
      }
    })
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  Order.update(
    req.body,
    {
      where:
        { id: orderId },
      returing: true,
      plain: true
    })
    .then(arr => {
      res.send(arr[1])
    })
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  Order.destroy({
    where: { id: orderId }
  })
    .catch(next)
})
