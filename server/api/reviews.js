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
 
  router.get('/:reviewId',(req,res,next)=>{
    Review.findById(req.param.reviewId)
    .then(foundReview => {
      if (foundReview){
        res.send(foundReview)
      }
      else {
        const err = new Error('We cannot find that review')
        err.status = 404
        next(err)
      }
    })
    .catch(next)
  })

  router.delete('/:reviewId',(req,res,next) => {
    const reviewId = req.body.reviewId
    Review.destroy({
      where: {id: reviewId}
    })
    .then(() => res.status(204).send('Review deleted'))
    .catch(next)
  })
