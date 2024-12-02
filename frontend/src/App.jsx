import Signup from "./components/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Todocontainer from "./components/todocontainer";
import Usercontext from "./components/usercontext";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <>
      <Usercontext.Provider value={{ userId, setUserId }}>
        <Router>
          <div className="App">
            {/* Define the Routes */}
            <Routes>
              <Route path="/" element={<Todocontainer />} />{" "}
              {/* Default route for login */}
              <Route path="/signup" element={<Signup />} /> {/* Signup page */}
              <Route path="/login" element={<Login />} />{" "}
              {/* Todo application */}
            </Routes>
          </div>
        </Router>

        {/* <Signup /> */}
        {/* <Todocontainer />
      <Login /> */}
      </Usercontext.Provider>
    </>
  );
}

export default App;
