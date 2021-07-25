const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signIn = async (req, res) => {
  const { taiKhoan, matKhau } = req.body;
  try {
    const userLogin = await User.findOne({ where: { taiKhoan } });
    if (userLogin) {
      const isAuth = bcryptjs.compareSync(matKhau, userLogin.matKhau);
      if (isAuth) {
        const payLoad = {
          id: userLogin.id,
          taiKhoan: userLogin.taiKhoan,
          maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
          email: userLogin.email,
          maNhom: userLogin.maNhom,
          hoTen: userLogin.hoTen,
        };
        const secretKey = "TuanLT";
        const token = jwt.sign(payLoad, secretKey, { expiresIn: "10d" });

        res.status(200).send({ message: "Đăng Nhập Thành Công", token });
      } else {
        res.status(400).send("Vui Lòng Kiểm Tra Mật Khẩu.");
      }
    } else {
      res.status(404).send("Tài Khoản Không Tồn Tại.");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const authorize = (arrRole) => (req, res, next) => {
  const { user } = req;
  const checkRole = arrRole.findIndex((role) => user.maLoaiNguoiDung === role);
  if (checkRole > -1) {
    next();
  } else {
    res.status(403).send("Người Dùng Không Hợp Lệ.");
  }
};
module.exports = { signIn, authorize };
