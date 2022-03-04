import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setName, setToken } = useContext(UserContext);

  const fetchData = async (e) => {
    e.preventDefault();
    console.log(email, password);
    axios
      .post("https://todos.data.my.id/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setName(res.data.data.name);
        setToken(res.data.access_token);
        localStorage.setItem("session", JSON.stringify(res.data));
        console.log(res.data.data.name);
        console.log(res.data.access_token);
        navigate("/todos");
      })
      .catch((err) => {
        console.log(err);
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <div className="register text-center">
          <p>
            Didn't have account?
            <span>
              <br />
              <a className="" href="#default">
                Register
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
