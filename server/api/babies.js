const router = require('express').Router()
const {Baby} = require('../db/models')
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Baby.findAll({
  })
    .then(babies => res.json(babies))
    .catch(next)
})


router.get('/:babyId', (req, res, next) => {
  const babyId = req.params.babyId
  Baby.findAll( {
      where: { id: babyId }, 
      include: [{ model: Review, as:'Review'}]
    } )
    .then(babies => res.json(babies))
    .catch(next)
})

//just for admins
router.post('/', (req, res, next) => {
  Baby.findOrCreate({
    where: { name: req.body.name }
  })
    .then(arr => {
      if (arr[1]) {
        res.send(arr[0])
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
  const babyId = req.params.babyId
  Baby.update(
    req.body,
    {
      where:
        { id: babyId },
      returing: true,
      plain: true
    })
    .then(arr => {
      res.send(arr[1])
    })
    .catch(next)
})

router.delete('/:babyId', (req, res, next) => {
  const babyId = req.params.babyId
  Baby.destroy({
    where: { id: babyId }
  })
    .catch(next)
})