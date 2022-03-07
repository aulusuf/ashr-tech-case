import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("session", JSON.stringify(res.data));
        window.location.reload();
        navigate("/todos");
      })
      .catch(() => {
        setError("username atau password salah!");
        navigate("/");
      });
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5">ToDo List</h1>
      <div className="login">
        <form className="login-form" onSubmit={fetchData}>
          <div className="mb-3">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center mb-3">
            <p style={{ color: "red" }}>{error}</p>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="register text-center">
          <p>
            Didn't have account?
            <span>
              <br />
              <Link to="/register" className="">
                Register
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
