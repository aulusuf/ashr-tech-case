import React from "react";
import moment from "moment";

function TodoListActive(props) {
  const handleClick = (data) => {
    props.setData(data);
  };
  const handleDelete = (data) => {
    props.setData(data);
  };
  const handleCheck = (data) => {
    props.setData(data);
  };
  return (
    <div>
      {props.data ? (
        props.data
          .filter((todo) => {
            return todo.status === "active";
          })
          .map((todo) => {
            return (
              <div key={todo.id}>
                <div
                  className="todo-item row"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "thin",
                    backgroundColor: "#adb5bd",
                  }}
                >
                  <div className="todo-item-check col-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="todo-check"
                      onChange={() => handleCheck(todo)}
                      data-bs-toggle="modal"
                      data-bs-target="#checkTodo"
                    />
                    <label htmlFor="todo-check" />
                  </div>
                  <div
                    className="todo-item-content col-8"
                    data-bs-toggle="modal"
                    data-bs-target="#readTodo"
                    onClick={() => handleClick(todo)}
                  >
                    <div className="todo-item-date">
                      {moment(todo.created_at).calendar()}
                    </div>
                    <div className="todo-item-title">{todo.title}</div>
                  </div>
                  <div className="todo-item-delete col-2">
                    <button
                      className="btn btn-delete"
                      data-bs-toggle="modal"
                      data-bs-target="#confDelete"
                      onClick={() => handleDelete(todo)}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <p>Create your todo</p>
      )}
    </div>
  );
}
function TodoListCompleted(props) {
  const handleClick = (data) => {
    props.setData(data);
  };
  const handleDelete = (data) => {
    props.setData(data);
  };
  const handleUncheck = (data) => {
    props.setData(data);
  };
  return (
    <div>
      {props.data ? (
        props.data
          .filter((todo) => {
            return todo.status === "completed";
          })
          .map((todo) => {
            return (
              <div key={todo.id}>
                <div
                  className="todo-item row"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "thin",
                    backgroundColor: "#adb5bd",
                    opacity: 0.7,
                  }}
                >
                  <div className="todo-item-check col-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="todo-check"
                      checked={todo.status === "completed"}
                      onChange={() => handleUncheck(todo)}
                      data-bs-toggle="modal"
                      data-bs-target="#uncheckTodo"
                    />
                    <label htmlFor="todo-check" />
                  </div>
                  <div
                    className="todo-item-content col-8"
                    data-bs-toggle="modal"
                    data-bs-target="#readTodo"
                    onClick={() => handleClick(todo)}
                  >
                    <div className="todo-item-date">
                      {moment(todo.created_at).calendar()}
                    </div>
                    <div className="todo-item-title">{todo.title}</div>
                  </div>
                  <div className="todo-item-delete col-2">
                    <button
                      className="btn btn-delete"
                      data-bs-toggle="modal"
                      data-bs-target="#confDelete"
                      onClick={() => handleDelete(todo)}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <p>Create your todo</p>
      )}
    </div>
  );
}

function TodoListInactive(props) {
  const handleClick = (data) => {
    props.setData(data);
  };
  const handleDelete = (data) => {
    props.setData(data);
  };
  return (
    <div>
      {props.data ? (
        props.data
          .filter((todo) => {
            return todo.status === "inactive";
          })
          .map((todo) => {
            return (
              <div key={todo.id}>
                <div
                  className="todo-item row"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "thin",
                    backgroundColor: "#adb5bd",
                    opacity: 0.3,
                  }}
                >
                  <div className="todo-item-check col-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="todo-check"
                      disabled
                    />
                    <label htmlFor="todo-check" />
                  </div>
                  <div
                    className="todo-item-content col-8"
                    data-bs-toggle="modal"
                    data-bs-target="#readTodo"
                    onClick={() => handleClick(todo)}
                  >
                    <div className="todo-item-date">
                      {moment(todo.created_at).calendar()}
                    </div>
                    <div className="todo-item-title">{todo.title}</div>
                  </div>
                  <div className="todo-item-delete col-2">
                    <button
                      className="btn btn-delete"
                      data-bs-toggle="modal"
                      data-bs-target="#confDelete"
                      onClick={() => handleDelete(todo)}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <p>Create your todo</p>
      )}
    </div>
  );
}

export { TodoListActive, TodoListCompleted, TodoListInactive };
