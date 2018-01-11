const router = require('express').Router()
const {Baby} = require('../db/models')
const {Review, LineItem} = require('../db/models')
module.exports = router

router.param('babyId', (req, res, next, babyId) => {
  Baby.findOne( {
      where: { id: babyId }, 
      include: [{ model: Review}, {model: LineItem}]
    } )
    .then(baby => {
      req.baby = baby
      next()
    })
})

router.get('/', (req, res, next) => {
  Baby.findAll({
    include: [{ model: Review}, {model: LineItem}]
  })
    .then(babies => res.json(babies))
    .catch(next)
})

router.get('/:babyId', (req, res, next) => {
  res.send(req.baby)
})

//just for admins
router.post('/', (req, res, next) => {
  Baby.findOrCreate({
    where: { name: req.body.name,
            poem: req.body.poem,
            price: req.body.price,
            inventory_qty: req.body.inventory_qty,
            imageUrl: req.body.imageUrl,
            category: req.body.category
    }
  })
    .then(arr => {
      if (arr[1]) {
        res.status(201).send(arr[0])
      }
      else {
        let err = new Error('That Baby is already home')
        err.status = 409
        next(err)
      }
    })
    .catch(next)
})

router.put('/:babyId', (req, res, next) => {
  Baby.update(
    req.body,
    {
      where:
        { id: req.baby.id },
      returning: true,
      plain: true
    })
    .then((babyArr) => {
      res.status(201).send(babyArr[1])
    })
    .catch(next)
})

router.delete('/:babyId', (req, res, next) => {
  Baby.destroy({
    where: { id: req.baby.id }
  })
  .then(() => {
    res.status(204).send('User deleted')
  })
  .catch(next)
})