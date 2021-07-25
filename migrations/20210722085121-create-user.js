"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taiKhoan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      matKhau: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      soDt: {
        type: Sequelize.STRING,
      },
      maNhom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      maLoaiNguoiDung: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hoTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
