"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryname: Sequelize.STRING,
      uuid: Sequelize.STRING,
      time: Sequelize.DATE,
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categories");
  },
};
