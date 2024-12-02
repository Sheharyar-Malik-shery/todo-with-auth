const {
  createtaskindb,
  deletetaskindb,
  updatetaskindb,
  getalltasksindb,
} = require("../servises/task.js");

const createtask = async (req, res) => {
  try {
    const data = req.body;
    const { task, completed = "false" } = data;
    const user = req.userId;
    const newtask = await createtaskindb(task, user, completed);
    // console.log(newtask, "new task ");
    if (!newtask) {
      return res.status(401).json({
        message: "Somethinh went wrong while savin in database",
        status: false,
      });
    }

    // console.log(data, user, "from task api user id");
    return res
      .status(200)
      .json({ message: "Task created successfully", status: true });
  } catch (error) {
    console.log("Error while creating new task", error.message);
  }
};

const deletetask = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(typeof id, "task id type");
    const task = await deletetaskindb(id);
    if (task === null) {
      return res.status(400).json({
        message:
          "something went wrong while deleting the task from the database",
      });
    }

    return res.status(200).json({ message: "Task deletd successfully" });
  } catch (error) {
    console.log(
      "Error while deleteing the task from controller",
      error.message
    );
  }
};

const updatetask = async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    console.log(data, id, "from update");

    // console.log(typeof id, "task id type");
    const task = await updatetaskindb(id, data);
    if (task === null) {
      return res.status(400).json({
        message: "task not found in the database",
      });
    }

    return res.status(200).json({ message: "Task Updated successfully" });
  } catch (error) {
    console.log("Error while updating the task from controller", error.message);
  }
};

const getalltasks = async (req, res) => {
  try {
    let id = req.params.id;

    console.log(id, "from alltasks");

    // console.log(typeof id, "task id type");
    const task = await getalltasksindb(id);
    if (task === null) {
      return res.status(400).json({
        message: "task not found in the database",
      });
    }

    return res
      .status(200)
      .json({ tasks: task, message: "all tasks fetched successfully" });
  } catch (error) {
    console.log("Error while fetching the task from controller", error.message);
  }
};

module.exports = {
  createtask,
  deletetask,
  updatetask,
  getalltasks,
};
