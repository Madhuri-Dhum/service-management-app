const express = require("express");
const authController = require("../controller/auth.controller");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const data = await authController.userLogin(req.body);
    res.status(200).json({ message: "Login successfully", data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
