"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "services",
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      tableName: "services",
      timestamps: false,
    }
  );

  Service.associate = function (models) {
    Service.hasMany(models.priceOptions, { foreignKey: "serviceId", as: "priceOptions" });
    Service.belongsTo(models.categories, { foreignKey: "categoryId", as: "category" });
  };
  return Service;
};
