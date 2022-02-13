const router = require('express').Router()
const controllers = require('../controllers')

router.post('/signup', controllers.signup)// 회원가입
router.delete('/signout', controllers.signout)// 회원탈퇴
router.post('/login', controllers.login) // 유저 로그인


module.exports = router