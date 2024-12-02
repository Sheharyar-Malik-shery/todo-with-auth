import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const AddToDo = ({
  input,
  setInput,
  tasks,
  settasks,
  previoustext,
  setPreviousText,
  updateitemindex,
  setUpdateItemIndex,
}) => {
  console.log("this is from addtodo", previoustext);
  console.log("this is from addtodo", updateitemindex);
  let userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handlebtn = async () => {
    if (input.trim() === "") {
      alert("Please enter the task");
    } else {
      try {
        const response = await fetch(
          "http://localhost:8080/api/tasks/newtask",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              task: input,
              completed: "false",
            }),
            credentials: "include",
          }
        );

        const result = await response.json();
        if (response.ok) {
          alert(result.message || "Task Added successfully!");
          settasks([...tasks, { task: input, complete: false }]);
          console.log(input);
          setInput("");
        } else {
          alert(result.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating new task.");
      }
      console.log("btn clicked");
    }
  };

  const handleupdate = async () => {
    console.log("updatebtn clicked");
    try {
      // setInput(itemtext);
      let id = updateitemindex.trim();
      const response = await fetch(
        `http://localhost:8080/api/tasks/updatetask/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: input, completed: false }),
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        setInput("");
        setPreviousText("");
        setUpdateItemIndex(null);
        alert("Task updated successfully!");
      } else {
        alert(result.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are included in the request
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.removeItem("userid");
        alert(result.message || "Logged out successfully!");
        navigate("/");
        // Redirect user to the login page or home
      } else {
        alert(result.message || "Error while logging out");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("An error occurred while logging out");
    }
  };

  useEffect(() => {
    if (updateitemindex !== null) {
      setInput(previoustext);
    }
  }, [previoustext, updateitemindex, setInput]);

  return (
    <>
      <div className="d-flex px-6 align-items-center gap-3">
        <div className="custom-input border border-danger mb-4">
          <input
            type="text"
            placeholder="Enter the task"
            className="input"
            value={input}
            onChange={handleInputChange}
          />
          <button
            onClick={updateitemindex !== null ? handleupdate : handlebtn}
            className="btn text-white"
          >
            {updateitemindex === null ? "Add ToDo" : "Update"}
          </button>
        </div>
        {userid ? (
          <p
            style={{
              color: "white",
              backgroundColor: "#ff4500",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            Logout
          </p>
        ) : (
          <>
            <p>
              <Link
                to="/signup"
                style={{
                  color: "white",
                  backgroundColor: "#ff4500",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </p>
            <p>
              <Link
                to="/login"
                style={{
                  color: "white",
                  backgroundColor: "#ff4500",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default AddToDo;
