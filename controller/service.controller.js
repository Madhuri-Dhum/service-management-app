const db = require("../models");
const sequelize = db.sequelize;
const serviceModel = db.services;
const categoryModel = db.categories;
const priceOptionsModel = db.priceOptions;

const addService = async (req) => {
  console.log(req)
  const transaction = await sequelize.transaction();
  try {
    const { name, type, priceOptions, categoryId } = req;

    const service = await serviceModel.create(
      { name, type, categoryId },
      { transaction }
    );

    if (priceOptions && priceOptions.length > 0) {
      const priceOptionsData = priceOptions.map((option) => ({
        ...option,
        serviceId: service.id,
      }));

      await priceOptionsModel.bulkCreate(priceOptionsData, { transaction });
    }

    await transaction.commit();

    return service;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateService = async (req, serviceId) => {
  const {
    name,
    type,
    categoryId,
    optionToDelete,
    optionToUpdate,
    optionToAdd,
  } = req;
  const transaction = await sequelize.transaction();

  try {
    if (optionToDelete && optionToDelete.length) {
      await priceOptionsModel.destroy({
        where: { id: optionToDelete },
        transaction,
      });
    }

    if (optionToUpdate && optionToUpdate.length) {
      for (const option of optionToUpdate) {
        await priceOptionsModel.update(option, {
          where: { id: option.id },
          transaction,
        });
      }
    }

    if (optionToAdd && optionToAdd.length) {
      const priceOptionsData = optionToAdd.map((option) => ({
        ...option,
        serviceId: serviceId,
      }));

      await priceOptionsModel.bulkCreate(priceOptionsData, { transaction });
    }

    await serviceModel.update(
      { name: name, type: type, categoryId: categoryId },
      {
        where: { id: serviceId },
        transaction,
      }
    );

    await transaction.commit();

    return { success: true };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getService = async () => {
  return serviceModel.findAndCountAll({
    include: [
      {
        model: categoryModel,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: priceOptionsModel,
        as: "priceOptions",
        attributes: ["id", "price", "duration", "type"],
      },
    ],
  });
};

const deleteService = async (serviceId) => {
  const transaction = await sequelize.transaction();

  try {
    await priceOptionsModel.destroy({
      where: { serviceId },
      transaction,
    });

    await serviceModel.destroy({
      where: { id: serviceId },
      transaction,
    });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  addService,
  updateService,
  getService,
  deleteService,
};
