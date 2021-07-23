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
module.exports = { checkExit };
