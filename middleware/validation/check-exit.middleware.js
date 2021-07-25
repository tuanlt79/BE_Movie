const checkExit = (Model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkID = await Model.findOne({ where: { id } });
    if (checkID) {
      next();
    } else {
      res.status(404).send(`ID ${id} Không Tồn Tại.`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const checkDoubleTaiKhoan = (Model) => async (req, res, next) => {
  const { taiKhoan } = req.body;

  try {
    const checkDouble = await Model.findOne({ where: { taiKhoan } });

    if (checkDouble) {
      res.status(400).send(`Tài Khoản ${taiKhoan} Đã Tồn Tại.`);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const checkDoubleEmail = (Model) => async (req, res, next) => {
  const { email } = req.body;

  try {
    const checkDouble = await Model.findOne({ where: { email } });
    if (checkDouble) {
      res.status(400).send(`Email ${email} Đã Tồn Tại.`);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { checkExit, checkDoubleTaiKhoan, checkDoubleEmail };
