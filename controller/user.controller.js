const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const getListUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getInfoUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("Không Tìm Thấy Tài Khoản.");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  const { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } =
    req.body;

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(matKhau, salt);
    const newUser = await User.create({
      taiKhoan,
      matKhau: hashPassword,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung,
      hoTen,
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateUser = async (req, res) => {
  const { taiKhoan, email, matKhau, soDt, maNhom, maLoaiNguoiDung, hoTen } =
    req.body;
  const { id } = req.params;

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(matKhau, salt);
    const index = await User.findByPk(id);

    if (index !== null) {
      await User.update(
        {
          taiKhoan,
          email,
          soDt,
          matKhau: hashPassword,
          maNhom,
          maLoaiNguoiDung,
          hoTen,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).send(`Update Thành Công ID ${id}`);
    } else {
      res.status(400).send(`Không Tìm Thấy ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    let index = await User.findByPk(id);
    if (index !== null) {
      await User.destroy({
        where: {
          id,
        },
      });

      res.status(200).send(`Xoá Thành Công ID ${id}`);
    } else {
      res.status(400).send(`Không Tìm Thấy ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getListUser,
  getInfoUser,
  createUser,
  updateUser,
  removeUser,
};
