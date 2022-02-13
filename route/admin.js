const router = require('express').Router()
const controllers = require('../controllers')

router.get('/order', controllers.Order)
router.patch('/permission', controllers.permission)
router.patch('/rejection', controllers.rejection)
router.get('/defaulter', controllers.defaulter)
module.exports = router