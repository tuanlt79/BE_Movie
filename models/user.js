"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      taiKhoan: DataTypes.STRING,
      matKhau: DataTypes.STRING,
      email: DataTypes.STRING,
      soDt: DataTypes.STRING,
      maNhom: DataTypes.STRING,
      maLoaiNguoiDung: DataTypes.STRING,
      hoTen: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
