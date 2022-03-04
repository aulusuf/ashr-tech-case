import React, { createContext, useState, useMemo } from "react";
import "./css/main.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Todo from "./components/Todo";

const session = JSON.parse(localStorage.getItem("session"));
export const UserContext = createContext({
  name: "",
  token: "",
  setName: () => {},
  setToken: () => {},
});

function App() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const user = useMemo(
    () => ({ name, token, setName, setToken }),
    [name, token]
  );
  return (
    <div className="container">
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<Todo />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
