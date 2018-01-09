const router = require('express').Router()
const {Order, User, LineItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
      include: [{model: User, as: 'user'}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  Order.findAll( {
      where: { id: orderId }, 
      include: [{ model: User, as: 'User'},
                {model: LineItem, as: 'lineitem'}]
    } )
    .then(orders => res.json(orders))
    .catch(next)
})
//stopped here 1/8/18
//for anytime you want to start or add to a cart (which is just an order)
/*
info we're getting: user_id, baby_id, lineitem_id, price, quantitiy

*/
router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: { user_id: req.body.userId, 
            complete: false}
  })
    .then(arr => {
      if (arr[1]) { //true , means it was just created
        //now post a new order
        const newOrder = arr[0]
        //newOrder.setUser(req.body.userId)//is this redundant?
        res.send(newOrder)
      }
      else { //false, already exists
        res.send(arr[0])
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
