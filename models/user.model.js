"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      // defaultScope: {
      //   attributes: { exclude: ["password"] },
      // },
    }
  );

  User.associate = function (models) {};
  return User;
};
