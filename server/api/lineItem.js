const router = require('express').Router()
const { LineItem, Baby, Order } = require('../db/models')
module.exports = router

router.param('lineItemId', (req, res, next, lineItemId) => {
  LineItem.findOne({
    where: {id: lineItemId},
    include: [{model: Baby}, {model: Order}]
  })
    .then(lineItem => {
      req.lineItem = lineItem
      next()
    })
})

router.get('/', (req, res, next) => {
  LineItem.findAll({
    include: [{model: Baby}, {model: Order}]
  })
    .then(lineItems => res.json(lineItems))
    .catch(next)
})


router.get('/:lineItemId', (req, res, next) => {
  res.send(req.lineItem)
})

router.get('/orders/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    LineItem.findAll({
      where: {orderId: orderId},
      include: [{model: Order}]
    })
      .then(lineItems => res.json(lineItems))
      .catch(next)
})

router.post('/', (req, res, next) => {
  LineItem.create({
    price: req.body.price,
    quantity: req.body.quantity,
    userId: req.body.userId,
    babyId: req.body.babyId,
    orderId: req.body.orderId
  })
    .then(createdLI => {
      res.send(createdLI)
    })
    .catch(next)
})

router.put('/:lineItemId', (req, res, next) => {
  LineItem.update(
    req.body,
    {
      where:
        { id: req.lineItem.id },
      returning: true,
      plain: true
    }
  )    
  .then((lineItemArr) => {
    res.status(201).send(lineItemArr[1])
  })
  .catch(next)
})

router.delete('/:lineItemId', (req, res, next) => {
  LineItem.destroy({
    where: { id: req.lineItem.id }
  })
  .then(() => {
    res.status(204).send('User deleted')
  })
  .catch(next)
})