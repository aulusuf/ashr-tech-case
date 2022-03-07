import React from "react";

function ActiveTodo(props) {
  return (
    <div className="modal fade" id="uncheckTodo" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-blue">Confirmation</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <p>Are you sure activating this todo?</p>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={props.uncheck}
                >
                  Sure!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveTodo;
