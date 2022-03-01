import React from "react";

function CreateTodo() {
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
                <input className="form-control" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="addDesc" className="col-sm-2 form-label">
                  Description
                </label>
                <input className="form-control" type="text" />
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
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
