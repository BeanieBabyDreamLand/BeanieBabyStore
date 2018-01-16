const router = require('express').Router()
const { Review, User, Baby } = require('../db/models')
module.exports = router

router.param('reviewId', (req, res, next, reviewId) => {
  Review.findOne({
    where: {id: req.params.reviewId},
    include: [{model: User,
              attributes: ['firstname', 'lastname', 'fullname']},
            {model: Baby}]
  })
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

router.get('/', (req, res, next) => {
  Review.findAll({
    include: [{ model: Baby}, {model: User}]
  })
    .then(babies => res.json(babies))
    .catch(next)
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
