const router = require('express').Router()
const controllers = require('../controllers')

router.get('/', controllers.getOrder)
router.post('/', controllers.postOrder)
router.delete('/', controllers.deleteOrder)

module.exports = router