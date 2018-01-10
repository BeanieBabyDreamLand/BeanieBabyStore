const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router



router.post('/', (req, res, next) => {
    Review.create({
      rating: req.body.rating,
      text: req.body.text,
      babyId: req.body.babyId,
      userId: req.body.userId
    })
      .then(review => res.send(review))
      .catch(next)
  })