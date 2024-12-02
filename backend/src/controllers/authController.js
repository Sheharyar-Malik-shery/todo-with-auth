const { checkifuserexists, newusercreated } = require("../servises/auth.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeruser = async (req, res) => {
  try {
    const data = req.body;

    const existingUser = await checkifuserexists(data);
    if (existingUser) {
      res.status(400).json({ message: "Email already exists", status: false });
    }

    const usercreated = await newusercreated(data);
    if (usercreated) {
      res
        .status(200)
        .json({ messaage: "user created successfully ", status: true });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error while creating new user",
      status: false,
      error: error.messaage,
    });
  }
};

const loginuser = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    // console.log(email, password, "from login");

    const existingUser = await checkifuserexists(data);
    // console.log(existingUser, "from login");

    if (existingUser === null) {
      return res.status(400).json({
        message: "Email not exists please enter the valid email",
        status: false,
      });
    }

    const passwordIsMatched = await bcrypt.compare(
      data.password,
      existingUser.password
    );
    if (!passwordIsMatched) {
      return res
        .status(401)
        .json({ message: "Password is Invalid", status: "false" });
    } else {
      console.log(existingUser._id, "from login");

      const token = jwt.sign(
        { token: existingUser._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      // console.log(token, "here is the token");

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use HTTPS in production
          // sameSite: "strict", // Strict SameSite polic
        })
        .status(200)
        .json({
          userid: existingUser._id,
          message: "Logedin Successfully",
          status: "true",
        });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ messaage: "Error while login ", status: false });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty value and setting expiration to a past date
    res.clearCookie("token", {
      httpOnly: true, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error during logout" });
  }
};

module.exports = {
  registeruser,
  loginuser,
  logout,
};
