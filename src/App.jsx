import React from "react";
import "./css/main.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Register from "./components/Register";

const session = JSON.parse(localStorage.getItem("session"));

function useAuth() {
  return session;
}

function PrivateRoute({ children }) {
  let auth = useAuth();
  return auth ? children : <Navigate to="/" />;
}

function PublicRoute({ children }) {
  let auth = useAuth();
  return auth === null ? children : <Navigate to="/todos" />;
}

function App() {
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
