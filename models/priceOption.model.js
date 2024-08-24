"use strict";
module.exports = (sequelize, DataTypes) => {
  const PriceOptions = sequelize.define(
    "priceOptions",
    {
      price: DataTypes.DECIMAL(10, 2),
      duration: DataTypes.INTEGER,
      type: DataTypes.STRING,
      serviceId: DataTypes.INTEGER,
    },
    {
      tableName: "priceOptions",
      timestamps: false,
    }
  );

  PriceOptions.associate = function (models) {
    PriceOptions.belongsTo(models.services, {
      foreignKey: "serviceId",
      as: "service",
    });
  };
  return PriceOptions;
};
