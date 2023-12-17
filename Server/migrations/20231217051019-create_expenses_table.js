"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("expenses", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      expensename: Sequelize.STRING,
      amount: Sequelize.INTEGER,
      uuid: Sequelize.STRING,
      time: Sequelize.DATE,
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("expenses");
  },
};
