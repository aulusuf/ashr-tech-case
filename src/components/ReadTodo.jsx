import React from "react";

function ReadTodo(props) {
  // console.log(props.setData);
  return (
    <div
      className="modal fade"
      id="readTodo"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Todo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
                  value={props.data.title || ""}
                  onChange={(e) =>
                    props.setData({
                      ...props.data,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="addDesc" className="col-sm-2 form-label">
                  Description
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={props.data.description || ""}
                  onChange={(e) =>
                    props.setData({
                      ...props.data,
                      description: e.target.value,
                    })
                  }
                />
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
              onClick={props.edit}
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

export default ReadTodo;
