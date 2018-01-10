const router = require('express').Router()
const { User, Baby, Review, Order, LineItem } = require('../db/models')
module.exports = router

router.param('userId', (req, res, next, userId) => {
  User.findOne({
    where: {id: userId},
    attributes: ['id', 'email', 'firstname', 'lastname', 'fullname'],
    include: [{model: Review}]
    //include:[{ model: Baby}, {model: Review}, {model: Order}, {model: LineItem}]
  })
    .then(users => res.json(users))
    .catch(next)
}
)

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'firstname', 'lastname', 'fullname'],
    include: [{model: Review}]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  next();
})

//create a new user (signup page) assumes it comes with req.body.email, req.body.password, req.body.firstname, req.body.lastname
router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: { email: req.body.email, 
            firstname: req.body.firstname, 
            lastname: req.body.lastname,
            password: req.body.password }
  })
    .then(arr => {
      if (arr[1]) {
        res.send(arr[0])
      }
      else {
        let err = new Error('An account already exists for that email address')
        err.status = 409
        next(err)
      }
    })
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  console.log(req.userId)
  User.update(
    req.body,
    {
      where:
        { id: req.userId },
      returing: true,
      plain: true
    })
    .then(() => {
      res.status(201).send('Updated!')
    })
    .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  const userId = req.userId
  User.destroy({
    where: { id: userId }
  })
  .then(() => {
    res.status(204).send('User deleted')
  })
  .catch(next)
})