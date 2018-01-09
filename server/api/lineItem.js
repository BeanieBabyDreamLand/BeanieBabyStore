const router = require('express').Router()
const { LineItem } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  LineItem.findAll({
  })
    .then(lineItems => res.json(lineItems))
    .catch(next)
})


router.get('/:lineItemId', (req, res, next) => {
  const lineItemId = req.params.lineItemId
  LineItem.findById(lineItemId)
    .then(lineItems => res.json(lineItems))
    .catch(next)
})

router.get('/orders/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    LineItem.findAll({
      where: {orderId: orderId}
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
  const lineItemId = req.params.lineItemId
  LineItem.update(
    req.body,
    {
      where:
        { id: lineItemId },
      returing: true,
      plain: true
    })    
    .then(() => {
      res.status(201).send('Updated!')
    })
    .catch(next)
})

router.delete('/:lineItemId', (req, res, next) => {
  const lineItemId = req.params.lineItemId
  LineItem.destroy({
    where: { id: lineItemId }
  })
  .then(() => {
    res.status(204).send('User deleted')
  })
  .catch(next)
})