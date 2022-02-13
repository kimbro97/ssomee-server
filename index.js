const express = require('express')
const app = express()
const PORT = 80
const userRoute = require('./route/user')
const orderRoute = require('./route/order')
const adminRoute = require('./route/admin')

app.use(express.json())
app.use('/user', userRoute)
app.use('/order', orderRoute)
app.use('/admin', adminRoute)

app.get('/', (req, res) => {
    res.send('Welcome To Ssomee')
})

app.listen(PORT, () => {
    console.log('이 서버는 80번 PORT에서 실행중입니다.')
})