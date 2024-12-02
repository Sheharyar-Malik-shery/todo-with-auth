const Todo = require("../models/todo.model");
// const mongoose = require("mongoose");

const createtaskindb = async (task, user, completed) => {
  //   console.log(task, user, "from ser");
  try {
    const newtask = new Todo({
      user,
      task,
      completed,
    });
    await newtask.save();
    console.log(newtask, "from ser");

    return newtask;
  } catch (error) {
    console.log("Error while creating new task", error.message);
  }
};

const deletetaskindb = async (id) => {
  try {
    const task = await Todo.findByIdAndDelete(id);
    console.log(task, "after deleting");
    return task;
  } catch (error) {
    console.log(
      "Error while deleting the task from database in servises",
      error.message
    );
  }
};

const updatetaskindb = async (id, data) => {
  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { $set: data }, // Update fields with provided values
      { new: true } // Return the updated document
    );
    console.log(updatedTask, "in update");
    return updatedTask;
  } catch (error) {
    console.log(
      "Error while updating the task from database in servises",
      error.message
    );
  }
};

const getalltasksindb = async (id) => {
  try {
    const alltasks = await Todo.find({ user: id });
    console.log(alltasks, "in getall task");
    return alltasks;
  } catch (error) {
    console.log(
      "Error while getting the task from database in servises",
      error.message
    );
  }
};

module.exports = {
  createtaskindb,
  deletetaskindb,
  updatetaskindb,
  getalltasksindb,
};
