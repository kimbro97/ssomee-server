'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.STRING
      },
      second_payment: {
        type: Sequelize.STRING
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      user_mobile: {
        type: Sequelize.STRING
      },
      approval: {
        type: Sequelize.BOOLEAN
      },
      overdue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      step: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};