require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
var cors = require("cors");
const DBConnection = require("./DBconnection/index.js");
const authroutes = require("../src/routes/authroutes.js");
const todosroute = require("./routes/todosroute.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//Database function
DBConnection();
app.use("/api/auth", authroutes);
app.use("/api/tasks", todosroute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`App start on ${PORT} port`));
