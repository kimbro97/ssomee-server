const { Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')
module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req)

    if (!loginUserInfo) {
      res.status(401).sned({ message: '유효하지 않은 토큰입니다' })
    } else {
      await Order.destroy({ where: { id: req.body.orderId }})
      res.status(200).send({ message: '임시저장된 주문이 삭제되었습니다' })  
    }
}