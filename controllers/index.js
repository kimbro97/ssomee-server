module.exports = {
    signup: require('./user/signup'),
    signout: require('./user/signout'),
    login: require('./user/login'),

    postOrder: require('./order/postOrder'),
    getOrder: require('./order/getOrder'),
    deleteOrder: require('./order/deleteOrder'),

    order: require('./admin/order'),
    permission: require('./admin/permission'),
    rejection: require('./admin/rejection'),
    getdefaulter: require('./admin/getDefaulter'),
    postdefaulter: require('./admin/postdefaulter'),
    completion: require('./admin/completion'),
}