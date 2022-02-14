const { User, Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')

module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req)

    if (loginUserInfo.admin === false) {
      res.status(401).send({ message: '관리자가 아니면 접근할 수 없습니다' })
    } else {
      const defaulterList = await Order.findAll({
        include: [
            { model: User, attributes: ['name', 'email']}
        ],
        where: {
            overdue: true
        },
        order: [['id', 'DESC']]
      })
      res.status(200).send({ defaulterList, message: '연체자들의 목록을 가져왔습니다' })
    }
}