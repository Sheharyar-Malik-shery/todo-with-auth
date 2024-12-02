import React, { useEffect } from "react";

const AllTasks = ({
  alltask,
  settasks,
  updatetask,
  handlecomplete,
  // complete,
}) => {
  const handledelete = async (taskid) => {
    console.log(taskid, "before try");

    try {
      let id = taskid.trim(); // Ensure this is declared first
      console.log(id, "deleted item id");
      console.log(typeof id, "type of the id");

      const response = await fetch(
        `http://localhost:8080/api/tasks/deletetask/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      const result = await response.json();
      console.log(result, "from delete");

      if (response.ok) {
        alert(result.message || "User registered successfully!");
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Error while deleting the task from frontend");
      console.error(error); // Add this to debug further
    }
  };

  return (
    <div className="text-center justify-contnet-center p-2">
      {alltask.map((task, index) => (
        <div
          className="d-flex gap-4 m-3 justify-content-center align-items-center"
          key={index}
        >
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.completed === "true" ? true : false}
            value={task.completed}
            onChange={(e) => handlecomplete(task._id, e.target.checked)}
          />
          <p
            className="col-8 text-wrap text-start m-0"
            style={{ wordBreak: "break-word" }}
          >
            {task.task}
          </p>
          <button
            onClick={() => handledelete(task._id)}
            className="col-1 bg-danger rounded p-2 text-white border-0"
          >
            Delete
          </button>
          <button
            onClick={() => updatetask(task._id, task.task)}
            className="col-1 bg-warning p-2 text-white rounded border-none border-0"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;
