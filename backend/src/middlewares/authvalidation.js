const validation = (req, res, next) => {
  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      data: data,
      message: "No data sent in the request",
      status: false,
    });
  }

  const { name, email, password } = data;

  const lowerCaseEmail = email.toLowerCase();

  if (name === "" && lowerCaseEmail === "" && password) {
    return res.status(400).json({
      message: "enter the name, email and password something is missing",
      status: false,
    });
  }
  if (name === "" || lowerCaseEmail === "" || password === "") {
    return res.status(400).json({
      message: "enter the name, email and password something is missing",
      status: false,
    });
  }

  // Validate name (minimum length and no special characters)
  const nameRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
  if (name.length < 3 || !nameRegex.test(name)) {
    return res.status(400).json({
      data: data,
      message:
        "Name must be at least 3 characters long and contain only letters and spaces",
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
  // console.log(name, email, "from middleware");
  next();
};

module.exports = validation;
