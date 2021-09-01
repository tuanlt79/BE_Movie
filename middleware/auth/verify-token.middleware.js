const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send("Bearer Token Không Hợp Lệ.");
  }
};
const authencate = (req, res, next) => {
  //   const token = req.header("token");
  const { token } = req;
  //   console.log(token);
  try {
    const secretKey = "TuanLT";
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send("Vui lòng đăng nhập.");
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
module.exports = { authencate, authorize, verifyToken };
