const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

router.post("/", async function (req, res, next) {
  try {
    await categoryController.addCategory(req.body);
    res.status(201).json({
      status: true,
      message: "Category added successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const data = await categoryController.getCategories(req);
    res.status(200).json({ status: true, message: "success", data: data });
  } catch (error) {
    next(error);
  }
});

router.put("/:categoryId", async function (req, res, next) {
  try {
    await categoryController.updateCategory(req.body, req.params.categoryId);
    res
      .status(201)
      .json({ status: true, message: "Category updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:categoryId", async function (req, res, next) {
  try {
    await categoryController.deleteCategory(req.params.categoryId);
    res
      .status(201)
      .json({ status: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
