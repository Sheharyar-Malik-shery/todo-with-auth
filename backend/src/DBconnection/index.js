const mongoose = require("mongoose");
const DATABASE_NAME = require("../constants/constants.js");

const DBConnection = async () => {
  try {
    const Dbconnection = await mongoose.connect(
      `${process.env.DATABASE_STRING}/${DATABASE_NAME}`
    );
    console.log(
      "MongoDB Connected Successfully && DB HOST is",
      Dbconnection.connection.host
    );
  } catch (error) {
    console.log("There is an error while connecting Database", error.message);
  }
};

module.exports = DBConnection;
