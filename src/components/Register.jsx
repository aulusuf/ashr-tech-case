import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log(formErrors);
    if (formErrors === null) {
      console.log(formErrors);
    } else {
      axios
        .post("/api/register", formValues)
        .then((res) => {
          console.log(res);
          localStorage.setItem("session", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((err) => {
          setError(err);
        });
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.name) {
      errors.name = "The name field is required";
    }
    if (!values.email) {
      errors.email = "The email field is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "The password field is required";
    }
    if (!values.password_confirmation) {
      errors.password_confirmation = "The confirm password field is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "THe confirm password does not match";
    }

    return errors;
  };
  return (
    <>
      <h1 className="text-center mt-5">ToDo List</h1>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
              value={formValues.name}
            />
            <p style={{ color: "red" }}>{formErrors.name}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Your Email"
              name="email"
              onChange={handleChange}
              value={formValues.email}
            />
            <p style={{ color: "red" }}>{formErrors.email}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
            <p style={{ color: "red" }}>{formErrors.password}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Your Password"
              id="inputConfirmPassword"
              name="password_confirmation"
              onChange={handleChange}
              value={formValues.password_confirmation}
            />

            <p style={{ color: "red" }}>{formErrors.password_confirmation}</p>
          </div>
          <div className="text-center mb-3">
            <p style={{ color: "red" }}>{error}</p>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <div className="login text-center">
          <p>
            Have any account?
            <span>
              <br />
              <Link to="/" className="">
                Login instead!
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
