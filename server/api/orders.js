const router = require('express').Router()
const {Order, User, LineItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
      include: [{model: User}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  Order.findAll( {
      where: { id: orderId }, 
      include: [{ model: User},
                {model: LineItem}]
    } )
    .then(orders => res.json(orders))
    .catch(next)
})
//for anytime you want to start or add to a cart (which is just an order)
/*
info we're getting: user_id, baby_id, lineitem_id, price, quantitiy

*/
router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: { userId: req.body.userId,
            total: 0, 
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
    .then(() => {
      res.status(201).send('Updated!')
    })
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId
  Order.destroy({
    where: { id: orderId }
  })
  .then(() => {
    res.status(204).send('User deleted')
  })
  .catch(next)
})
