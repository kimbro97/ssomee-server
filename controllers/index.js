module.exports = {
    signup: require('./user/signup'),
    signout: require('./user/signout'),
    login: require('./user/login'),

    order: require('./order/order'),

    Order: require('./admin/order'),
    permission: require('./admin/permission'),
    rejection: require('./admin/rejection'),
    defaulter: require('./admin/defaulter')
}