const { User, Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')

module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req)

    if (loginUserInfo.admin === false) {
      res.status(401).send({ message: '관리자가 아니면 접근할 수 없습니다' })
    } else {
      const orderList = await Order.findAll({
        include: [
            { model: User, attributes: ['name', 'email']}
        ],
        where: {
            step: 'complete'
        },
        order: [['id', 'DESC']]
      })
      res.status(200).send({ orderList, message: '회원들의 접수된 주문을 가져왔습니다' })
    }
}