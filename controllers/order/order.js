const { Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')
module.exports = async (req, res) => {
    const { shop, image_url, total_price, second_payment, delivery_address, user_mobile } = req.body

    const loginUserInfo = isAuthorized(req)

    if (!loginUserInfo) {
      res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else {
      await Order.create({
          shop,
          image_url,
          total_price,
          second_payment,
          delivery_address,
          user_mobile,
          userId: loginUserInfo.id
      })
      res.status(201).send({ message: '회원님의 주문이 성공적으로 등록되었습니다' })
    }
}