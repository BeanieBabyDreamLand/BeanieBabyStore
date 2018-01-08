import { read } from 'fs';

const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'firstname', 'lastname', 'fullname']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId
  User.findById((userId) => {
    attributes: ['id', 'email', 'firstname', 'lastname', 'fullname']
  })
    .then(users => res.json(users))
    .catch(next)
})

//create a new user (signup page) assumes it comes with req.body.email, req.body.password, req.body.firstname, req.body.lastname
router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: { email: req.body.email }
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
  const userId = req.params.userId
  User.update(
    req.body,
    {
      where:
        { id: userId },
      returing: true,
      plain: true
    })
    .then(arr => {
      res.send(arr[1])
    })
    .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  const userId = req.params.userId
  User.destroy({
    where: { id: userId }
  })
    .catch(next)
})