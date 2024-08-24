const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = db.users;

const userLogin = async (user) => {
  try {
    const userDetails = await userModel.findOne({
      where: { email: user.email },
    });

    if (!userDetails) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordEqual = await bcrypt.compare(
      user.password,
      userDetails.password
    );

    if (!isPasswordEqual) {
      const error = new Error("Password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    const userPayload = {
      id: userDetails.id,
    };

    const token = await jwt.sign(userPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    return {
      name: userDetails.name,
      email: userDetails.email,
      token,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { userLogin };
