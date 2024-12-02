const validationlogin = (req, res, next) => {
  const data = req.body;
  const { email, password } = data;
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      data: data,
      message: "No data sent in the request",
      status: false,
    });
  }

  const lowerCaseEmail = email.toLowerCase();

  if (lowerCaseEmail === "" && password) {
    return res.status(400).json({
      data: data,
      message: "enter the name, email and password something is missing",
      status: false,
    });
  }
  if (lowerCaseEmail === "" || password === "") {
    return res.status(400).json({
      data: data,
      message: "enter the name, email and password something is missing",
      status: false,
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
  if (!emailRegex.test(lowerCaseEmail)) {
    return res.status(400).json({
      data: data,
      message: "Invalid email format",
      status: false,
    });
  }

  // Validate password strength
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  /*
     Password must:
     - Be at least 8 characters long
     - Include at least one letter
     - Include at least one number
     - Include at least one special character
   */
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      data: data,
      message:
        "Password must be at least 8 characters long, include a letter, a number, and a special character",
      status: false,
    });
  }
  req.body.email = lowerCaseEmail;
  //   console.log(email, "from middleware after lowerkase");
  next();
};

module.exports = validationlogin;
