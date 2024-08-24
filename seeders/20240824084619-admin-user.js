"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Admin123!@#", 10);

    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@codesfortomorrow.com",
          password: hashedPassword,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "users",
      {
        email: "admin@codesfortomorrow.com",
      },
      {}
    );
  },
};
