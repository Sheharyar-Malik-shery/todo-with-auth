const express = require("express");
const {
  createtask,
  deletetask,
  updatetask,
  getalltasks,
} = require("../controllers/todosController.js");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateuser.js");

router.post("/newtask", authenticateUser, createtask);
router.delete("/deletetask/:id", authenticateUser, deletetask);
router.patch("/updatetask/:id", authenticateUser, updatetask);
router.get("/alltasks/:id", authenticateUser, getalltasks);

module.exports = router;
