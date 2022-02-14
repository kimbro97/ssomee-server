'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    shop: DataTypes.STRING,
    image_url: DataTypes.STRING,
    total_price: DataTypes.STRING,
    second_payment: DataTypes.STRING,
    delivery_address: DataTypes.STRING,
    user_mobile: DataTypes.STRING,
    approval: DataTypes.BOOLEAN,
    overdue: DataTypes.BOOLEAN,
    step: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};