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
  LineItem.findById((lineItemId) => {
  })
    .then(lineItems => res.json(lineItems))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    LineItem.findAll({
      where: {order_id: orderId}
    })
      .then(lineItems => res.json(lineItems))
      .catch(next)
  })
  

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
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
    .then(arr => {
      res.send(arr[1])
    })
    .catch(next)
})

router.delete('/:lineItemId', (req, res, next) => {
  const lineItemId = req.params.lineItemId
  LineItem.destroy({
    where: { id: lineItemId }
  })
    .catch(next)
})