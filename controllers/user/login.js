const { User } = require('../../models')
const bcrypt = require('bcrypt')
const { signAccessToken } = require('../../modules/token')

module.exports = async (req, res) => {
    const { email, password } = req.body
    if (!email|| !password) {
      return res.status(422).send({ message: '로그인을 위해서 모든 정보가 필요합니다.' })
    }

    try {
      const userInfo = await User.findOne({
          where: {
              email: email
          }
      })
      
      if (userInfo.dataValues.signoutAt !== null) { // 탈퇴한 아이디라면
        res.status(401).send({ message: '회원을 탈퇴한 이메일입니다' })
      } else { // 탈퇴하지 않은 아이디 라면
        const same = await bcrypt.compareSync(password, userInfo.dataValues.password)

        if (!userInfo || !same) { // 로그인 정보가 일치
            res.status(400).send({ message: '로그인 정보가 일치하지 않습니다' })
        } else {
            delete userInfo.dataValues.password
            const accessToken = signAccessToken(userInfo.dataValues)

            res.status(200).send({ accessToken: accessToken, message: '로그인에 성공했습니다' })
        }
      }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}