const router = require('express').Router()
const {Order, User, LineItem} = require('../db/models')
module.exports = router

router.param('orderId', (req, res, next, orderId) => {
  Order.findOne( {
      where: { id: orderId },
      include: [{ model: User,
                  attributes: ['firstname', 'lastname', 'fullname', 'email']},
                {model: LineItem}]
    } )
    .then(order => {
      req.order = order
      next()
    })
})

// router.get('/', (req, res, next) => {
//   Order.findAll({
//       include: [{model: User,
//                   attributes: ['firstname', 'lastname', 'fullname', 'email']},
//                 {model: LineItem}
//               ]
//   })
//     .then(orders => res.json(orders))
//     .catch(next)
// })

router.get('/', (req,res,next) => {
    const userId = req.session.passport.user
    console.log('userId: ', userId)
    Order.findAll({
        where: { userId: userId}
    })
    .then(allUsersOrders => {
      res.json(allUsersOrders)
    })
    .catch(next)
})


router.get('/:orderId', (req, res, next) => {
  res.send(req.order)
})

//for anytime you want to start or add to a cart (which is just an order)
/*
info we're getting: user_id, baby_id, lineitem_id, price, quantitiy
*/
router.post('/', (req, res, next) => {
  const userId = req.session.passport.user
  Order.findOrCreate({
    where: { userId: userId,
            total: 0,
            complete: false}
  })
    .then(arr => {
      if (arr[1]) { //true , means it was just created
        //now post a new order
        const newOrder = arr[0]
        res.send(newOrder)
      }
      else { //false, already exists
        res.send(arr[0])
      }
    })
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.update(
    req.body,
    {
      where:
        { id: req.order.id },
      returning: true,
      plain: true
    })
    .then((orderArr) => {
      res.status(201).send(orderArr[1])
    })
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  Order.destroy({
    where: { id: req.order.id }
  })
  .then(() => {
    res.status(204).send('Order deleted')
  })
  .catch(next)
})
