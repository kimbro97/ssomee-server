require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

module.exports = {

  signAccessToken: (data) => {
    return sign(data, process.env.ACCESS_TOKEN, { expiresIn: '24h' })
  },
  isAuthorized: (req) => {
    const authorization = req.headers.authorization
    if (!authorization) {
      return null
    }
    const token = authorization.split(' ')[1]
    try {
      return verify(token, process.env.ACCESS_TOKEN)
    } catch (err) {
      return null
    }
  }
}

