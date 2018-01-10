const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.param('reviewId', (req, res, next, reviewId) => {
  Review.findById(req.params.reviewId)
    .then(foundReview => {
      if (foundReview) {
        req.review = foundReview
        next()
      }
      else {
        const err = new Error('We cannot find that review')
        err.status = 404
        next(err)
      }
    })
})

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

router.get('/:reviewId', (req, res, next) => {
  res.send(req.review)
})

router.delete('/:reviewId', (req, res, next) => {
  Review.destroy({
    where: { id: req.review.id }
  })
    .then(() => res.status(204).send('Review deleted'))
    .catch(next)
})
