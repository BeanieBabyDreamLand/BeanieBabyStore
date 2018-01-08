const router = require('express').Router()
const {Baby} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Baby.findAll({
  })
    .then(users => res.json(users))
    .catch(next)
})