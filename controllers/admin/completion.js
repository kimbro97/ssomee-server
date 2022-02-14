const { User, Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')

module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req)

    if (loginUserInfo.admin === false) {
      res.status(401).send({ message: '관리자가 아니면 접근할 수 없습니다' })
    } else {
      await Order.update({
          completedAt: new Date()
      }, {
          where: {
              id: req.body.orderId
          }
      })
      res.status(200).send({ message: '상품의 결제가 완료되었었습니다' })
    }
}