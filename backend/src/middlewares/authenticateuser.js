const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "You are unauthorized || need to login first",
      token: req.cookies.tokenen || "null",
    });
  }
  try {
    const varify = jwt.verify(token, process.env.SECRET_KEY);
    console.log(varify, "middle ware");

    req.userId = varify.token;
    // console.log(token);
    next();
  } catch (error) {
    return res.status(403).json({
      message:
        "Forbidden: Invalid token You are unauthorized || need to login first ",
    });
  }
};

module.exports = authenticateUser;
