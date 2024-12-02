const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  task: {
    type: String,
    require: true,
  },
  completed: {
    type: String,
    default: "false",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
