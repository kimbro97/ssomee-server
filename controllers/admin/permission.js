const { Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')

module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req)

    if (loginUserInfo.admin === false) {
        res.status(401).send({ message: '관리자가 아니면 접근할 수 없습니다' })
    } else {
        await Order.update({
            approval: true
        },{
            where: {
                id: req.body.orderId
            }
        })
        res.status(201).send({ message: '고객님의 상품주문이 승인되었습니다' })
    }
}