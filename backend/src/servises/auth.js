const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const checkifuserexists = async (data) => {
  const { email } = data;

  const userexists = await User.findOne({ email });

  return userexists;
};

const newusercreated = async (data) => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.log("Error while creating newuser", error.message);
  }
};

module.exports = {
  checkifuserexists,
  newusercreated,
};
