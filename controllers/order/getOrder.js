const { User, Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    const loginUserInfo = isAuthorized(req)

    if (!loginUserInfo) {
      res.status(401).sned({ message: '유효하지 않은 토큰입니다' })
    } else {
      const orderList = await Order.findAll({ // 유저가 진행중인 주문과 반려가안되고 아직 결제가 안된 주문
        where: {
          userId: loginUserInfo.id,
          completedAt: null, // 결제가 모두 완료된 주문
          [Op.or]: [
              { approval: null },
              { approval: true }
          ]
        }
      })

      if (orderList.length === 0) {
        res.status(200).send({ message: '새로운 주문을 시작할 수 있습니다' })
      } else if (orderList.length === 1) {
        if (orderList[0].step === 'complete') {
          res.status(200).send({ message: '새로운 주문을 시작할 수 있습니다' })
        } else {
          res.status(200).send({ orderList, message: '작성중인 주문을 불러왔습니다' })
        }
      } else if (orderList.length === 2) {
          const filterList = orderList.filter(el => {
            return el.step !== 'complete'
          })
          if (filterList.length === 1) {
            res.status(200).send({ orderList: filterList, message: '작성중인 주문을 불러왔습니다' })
          } else {
            res.status(401).send({ message: '현재 결제 진행중인 2개의 주문이 있습니다' })  
          }
      }
      
    }
}
