const { User, Order } = require('../../models')
const { isAuthorized, signAccessToken } = require('../../modules/token')
module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req) // 로그인 토큰 확인

    if (!loginUserInfo) { // 로그인 토큰이 유효하지 않을 때
        res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else { // 토큰이 유효하면
        const orderList = await Order.findAll({
            where: {
                userId: loginUserInfo.id
            }
        })
        const completedOrder = orderList.filter(el => {
            return el.completedAt === null
        })

        if (completedOrder.length > 0) { // 결제건이 남아 있다면
          res.status(401).send({ message: '아직 결제하지 않은 주문이 있어 회원탈퇴 할 수 없습니다' })
        } else { // 결제건이 남아 있지 않다면
          await User.update({
            signoutAt: new Date()
          }, {
            where: { id: loginUserInfo.id }
          })

          res.status(200).send({ message: '회원탈퇴 되었고 해당 이메일은 30일간 이용불가합니다' })  
        }
    }
}