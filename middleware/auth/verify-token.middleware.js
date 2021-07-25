const jwt = require("jsonwebtoken");
const authencate = (req, res, next) => {
  const token = req.header("token");
  try {
    const secretKey = "TuanLT";
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send("Vui lòng đăng nhập.");
  }
};
module.exports = { authencate };
