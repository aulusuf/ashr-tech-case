import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import en from "date-fns/locale/en";
import moment from "moment";
import axios from "axios";

function CreateTodo() {
  const session = JSON.parse(localStorage.getItem("session"));
  const initialValue = {
    title: "",
    description: "",
    start: "",
    end: "",
  };
  const [formTodo, setFormTodo] = useState(initialValue);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormTodo({
      ...formTodo,
      [name]: value,
    });
    console.log(formTodo);
  };

  const handleSubmit = () => {
    let data = {
      ...formTodo,
      start: moment(startDate).format("YYYY-MM-DD 00:00:00"),
      end: moment(endDate).format("YYYY-MM-DD 00:00:00"),
      status: "active",
    };
    postAPI(data);
    window.location.reload();
  };
  const postAPI = (data) => {
    // console.log(submit);
    let config = {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    };
    axios
      .post("/api/todos", data, config)
      .then((res) => {
        console.log(res.data, "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal fade" id="createTodo" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="addTitle" className="col-sm-2 form-label">
                  Title
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addDesc" className="col-sm-2 form-label">
                  Description
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group d-flex">
                <div>
                  <label htmlFor="startDate" className="col-sm-2 form-label">
                    Start
                  </label>
                  <DatePicker
                    name="startDate"
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    minDate={Date.now()}
                    startDate={startDate}
                    endDate={endDate}
                    selectsStart
                    placeholderText="Select Start Date"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div>
                  <label htmlFor="finishDate" className="col-sm-2 form-label">
                    Finish
                  </label>
                  <DatePicker
                    name="finishDate"
                    dateFormat="yyyy-MM-dd"
                    selected={endDate}
                    minDate={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    selectsEnd
                    placeholderText="Select Finish Date"
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit()}
              data-bs-dismiss="modal"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
