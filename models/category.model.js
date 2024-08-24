"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING,
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );

  Category.associate = function (models) {
    Category.hasMany(models.services, {
      foreignKey: "id",
      as: "category",
    });
  };
  return Category;
};
