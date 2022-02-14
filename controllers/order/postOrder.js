const { Order } = require('../../models')
const { isAuthorized } = require('../../modules/token')
module.exports = async (req, res) => {
    const { shop, image_url, total_price, second_payment, delivery_address, user_mobile, step, orderId } = req.body

    const loginUserInfo = isAuthorized(req)

    if (!loginUserInfo) {
      res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else {
      if (step === 'shop') {
        await Order.create({
          shop,
          step,
          userId: loginUserInfo.id
        })
        res.status(201).send({ message: '회원님의 1단계 주문이 임시저장되었습니다' })
      } else if (step === 'image') {
        await Order.update({
          shop,
          image_url,
          step,
          userId: loginUserInfo.id
        }, {
          where: {
            id: orderId
          }
        })
        res.status(201).send({ message: '회원님의 2단계 주문이 임시저장되었습니다' })
      } else if (step === 'price') {
        await Order.update({
          shop,
          image_url,
          total_price,
          step,
          userId: loginUserInfo.id
        }, {
          where: {
            id: orderId
          }
        })
        res.status(201).send({ message: '회원님의 3단계 주문이 임시저장되었습니다' })
      } else if (step === 'payment') {
        await Order.update({
          shop,
          image_url,
          total_price,
          second_payment,
          step,
          userId: loginUserInfo.id
        }, {
          where: {
            id: orderId
          }
        })
        res.status(201).send({ message: '회원님의 4단계 주문이 임시저장되었습니다' })
      } else if (step === 'complete') {
        await Order.update({
          shop,
          image_url,
          total_price,
          second_payment,
          delivery_address,
          user_mobile,
          step,
          userId: loginUserInfo.id
        }, {
          where: {
            id: orderId
          }
        })
        res.status(201).send({ message: '회원님의 주문이 성공적으로 등록되었습니다' })
      }
    }
}
