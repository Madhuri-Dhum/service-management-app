const express = require("express");
require("dotenv/config");
const app = express();
const authMiddleware = require("./middleware/validate");
const authRoute = require("./route/auth.route");
const categoryRoute = require("./route/category.route");
const serviceRoute = require("./route/service.route");

app.use(express.json());

app.use(authMiddleware);
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/service", serviceRoute);

app.use(function (error, req, res, next) {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data, status: false });
});

app.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT}`);
});
