const router = require('express').Router()
const controllers = require('../controllers')

router.post('/', controllers.order)

module.exports = router