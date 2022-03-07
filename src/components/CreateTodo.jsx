import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTodo(props) {
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
                  onChange={props.change}
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
                  onChange={props.change}
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
                    selected={props.startDate}
                    minDate={Date.now()}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    selectsStart
                    placeholderText="Select Start Date"
                    onChange={props.start}
                  />
                </div>
                <div>
                  <label htmlFor="finishDate" className="col-sm-2 form-label">
                    Finish
                  </label>
                  <DatePicker
                    name="finishDate"
                    dateFormat="yyyy-MM-dd"
                    selected={props.endDate}
                    minDate={props.startDate}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    selectsEnd
                    placeholderText="Select Finish Date"
                    onChange={props.end}
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
              onClick={props.submit}
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
