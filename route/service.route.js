const express = require("express");
const router = express.Router();
const serviceController = require("../controller/service.controller");

router.post("/", async function (req, res, next) {
  try {
    await serviceController.addService(req.body);
    res.status(201).json({
      status: true,
      message: "Service added successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const data = await serviceController.getService();
    res.status(200).json({ status: true, message: "success", data: data });
  } catch (error) {
    next(error);
  }
});

router.put("/:serviceId", async function (req, res, next) {
  try {
    await serviceController.updateService(req.body, req.params.serviceId);
    res
      .status(201)
      .json({ status: true, message: "Service updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:serviceId", async function (req, res, next) {
  try {
    await serviceController.deleteService(req.params.serviceId);
    res
      .status(201)
      .json({ status: true, message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
