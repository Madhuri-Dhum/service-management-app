const db = require("../models");
const { Op } = require("sequelize");
const serviceModel = db.services;
const categoryModel = db.categories;

const addCategory = async (req) => {
  try {
    await checkCategoryExist(req.name);

    return categoryModel.create(req);
  } catch (error) {
    throw error;
  }
};

const checkCategoryExist = async (name, categoryId, update = false) => {
  try {
    const categoryDetails = await categoryModel.findOne({
      where: {
        [Op.and]: [
          { name: name },
          update ? { id: { [Op.not]: categoryId } } : "",
        ],
      },
    });

    if (categoryDetails) {
      const error = new Error("Category already exists");
      error.statusCode = 409;
      throw error;
    }

    return categoryDetails;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (req, categoryId) => {
  try {
    if (req.name) {
      await checkCategoryExist(req.name, categoryId, true);
    }

    return categoryModel.update(req, {
      where: { id: categoryId },
    });
  } catch (error) {
    throw error;
  }
};

const getCategories = async () => {
  return categoryModel.findAndCountAll();
};

const deleteCategory = async (categoryId) => {
  try {
    const serviceCount = await serviceModel.count({ where: { categoryId } });
    console.log("services", serviceCount);

    if (serviceCount > 0) {
      const error = new Error(
        "Cannot delete category with associated services"
      );
      error.statusCode = 400;
      throw error;
    }

    return categoryModel.destroy({ where: { id: categoryId } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCategory,
  updateCategory,
  getCategories,
  deleteCategory,
};
