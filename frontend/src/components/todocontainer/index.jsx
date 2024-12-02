import { useState, useEffect, useContext } from "react";
import "../../App.css";
import AllTasks from "../../components/alltasks/index.jsx";
import AddToDo from "../../components/Add-todo/index.jsx";
import Usercontext from "../usercontext/index.jsx";

function Todocontainer() {
  // const { userId } = useContext(Usercontext);
  const userId = JSON.parse(localStorage.getItem("userid"));
  console.log(userId, "form the user Context global");

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [previoustext, setPreviousText] = useState("");
  const [updateitemindex, setUpdateItemIndex] = useState(null);
  // const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks... from useEffest"); // Add this log
      try {
        const response = await fetch(
          `http://localhost:8080/api/tasks/alltasks/${userId}`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();

        if (response.ok) {
          console.log(result.tasks, "From api");

          setTasks(result.tasks || []); // Assuming result contains a `tasks` array
          alert(result.message || "Get all tasks successfully!");
        } else {
          alert(result.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while getting all tasks.");
      }
    };
    // Call the async function
    if (userId) fetchTasks();
  }, [userId]);

  const handleupdate = (updateitem, itemtext) => {
    // console.log(updateitem, itemtext, "from searsh bar");
    setUpdateItemIndex(updateitem);
    setPreviousText(itemtext);
  };

  const handlecomplete = async (completeitemid, newCompletedValue) => {
    try {
      console.log(completeitemid, newCompletedValue, "from toggle");

      // setInput(itemtext);
      let id = completeitemid.trim();
      const response = await fetch(
        `http://localhost:8080/api/tasks/updatetask/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: newCompletedValue }),
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Task updated successfully!");
      } else {
        alert(result.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-4 text-center col-12 h-screen bg-gray-100">
      <AddToDo
        input={input}
        setInput={setInput}
        tasks={tasks}
        settasks={setTasks}
        previoustext={previoustext}
        setPreviousText={setPreviousText}
        setUpdateItemIndex={setUpdateItemIndex}
        updateitemindex={updateitemindex}
      />
      {tasks.length === 0 ? (
        "There is no tasks yet"
      ) : (
        <AllTasks
          alltask={tasks}
          settasks={setTasks}
          updatetask={handleupdate}
          handlecomplete={handlecomplete}
          // completed={completed}
        />
      )}
    </div>
  );
}

export default Todocontainer;
