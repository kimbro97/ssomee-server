const { User } = require('../../models')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) { // 필요한 정보가 다 들어오지 않으때 
    res.status(422).send({ message: '회원가입을 위해서 모든 정보가 필요합니다.' })
  }

  try {
    const userInfo = await User.findOne({ where: { email: email } })
    if (!userInfo) { // 유저 정보가 없다면 회원가입
      const hashPassword =  await bcrypt.hashSync(password, 10)
      
      await User.create({
        name: name,
        email: email,
        password: hashPassword
      })
      console.log('여기냐 ??')
      res.status(201).send({ message: '회원가입 성공'})
    } else { // 유저정보가 있다면 중복 이메일
      if (userInfo.dataValues.signoutAt === null) { // 회원탈퇴를 안했으면
        res.status(409).send({ message: '이미 존재하는 이메일 입니다' })
      } else { // 회원탈퇴한 기록이 있다면
        let today = new Date()
        let signoutTime = userInfo.dataValues.signoutAt
        let tomorrow = new Date(signoutTime)
        tomorrow.setDate(signoutTime.getDate() + 30)
        console.log('==========',today, tomorrow)
        if (today > tomorrow === false) { // 회원탈퇴 30일 이전
          res.status(409).send({ message: '회원탈퇴 후 30일이 경과하지 않았습니다' })
        } else { // 회원탈퇴 30일 이후
          await User.destroy({ where: { email: email }})// 30일 이후는 이메일 삭제
          const hashPassword =  await bcrypt.hashSync(password, 10) // 비밀번호 해쉬
          await User.create({ // 다시 이메일 만들어주기
            name: name,
            email: email,
            password: hashPassword
          })
          res.status(201).send({ message: '회원가입 성공'})
        }
      }
    }
  } catch (error) {
      console.log(error)
  }
}