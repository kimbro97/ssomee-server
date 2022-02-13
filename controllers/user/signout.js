const { User, Order } = require('../../models')
const { isAuthorized, signAccessToken } = require('../../modules/token')
module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req) // 로그인 토큰 확인

    if (!loginUserInfo) { // 로그인 토큰이 유효하지 않을 때
        res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else { // 토큰이 유효하면

        await User.update({
            signoutAt: new Date()
        }, {
            where: { id: loginUserInfo.id }
        })

        res.status(201).send({ message: '회원탈퇴 되었고 해당 이메일은 30일간 이용불가합니다' })
    }
}