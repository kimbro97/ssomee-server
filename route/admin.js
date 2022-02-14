const router = require('express').Router()
const controllers = require('../controllers')

router.get('/order', controllers.order)
router.patch('/permission', controllers.permission)
router.patch('/rejection', controllers.rejection)
router.get('/defaulter', controllers.getdefaulter)
router.patch('/defaulter', controllers.postdefaulter)
router.patch('/completion', controllers.completion)

module.exports = router