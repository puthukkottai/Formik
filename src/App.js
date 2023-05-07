import "./App.css";
import React from "react";

import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import User from "./user";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h1 style={{ textAlign: "center" }}>LIBRARY MANGEMENT SYSTEM</h1>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to={"/book"}>Book Data</Link>
            </li>
            <li>
              <Link to={"/user"}>User Data</Link>
            </li>
          </ul>
        </div>
        <div className="bookContent">
          <Routes>
            <Route path="/book" element={<Home />}></Route>
          </Routes>
        </div>
        <div className="userContent">
          <Routes>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
