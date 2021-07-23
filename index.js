const express = require("express");
const { rootRouter } = require("./routers/root.router");
const app = express();
const port = process.env.PORT || 4000;
//chuyen doi dang JSON
app.use(express.json());
app.use("/api", rootRouter);
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
