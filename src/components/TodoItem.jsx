import React, { useState } from "react";
import moment from "moment";
// import CreateTodo from "./CreateTodo";
// import ReadTodo from "./ReadTodo";
// import DeleteTodo from "./DeleteTodo";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "SELECT_TODO":
      return action.payload;
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
}

function TodoItem(props) {
  const [selectedTodo, setSelectedTodo] = useState({});
  // setSelectedTodo(props);
  const { data } = props;
  const handleClick = (data) => {
    setSelectedTodo(data);
    console.log(data);
    logging(data);
  };
  const logging = (selectedTodo) => {
    console.log(selectedTodo);
  };
  return (
    <>
      {/* <CreateTodo /> */}
      {/* <ReadTodo setData={data} /> */}
      {/* <DeleteTodo /> */}
      {props.children}
      <div
        className="todo-item row"
        style={
          props.data.status === "active"
            ? {
                borderStyle: "solid",
                borderWidth: "thin",
                backgroundColor: "#adb5bd",
              }
            : props.data.status === "completed"
            ? {
                borderStyle: "solid",
                borderWidth: "thin",
                backgroundColor: "#adb5bd",
                opacity: 0.5,
              }
            : props.data.status === "inactive"
            ? {
                borderStyle: "solid",
                borderWidth: "thin",
                backgroundColor: "#adb5bd",
                opacity: 0.2,
              }
            : null
        }
      >
        <div className="todo-item-check col-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="todo-check"
          />
          <label htmlFor="todo-check" />
        </div>
        <div
          className="todo-item-content col-8"
          data-bs-toggle="modal"
          data-bs-target="#readTodo"
          onClick={() => handleClick(data)}
        >
          <div className="todo-item-date">
            {moment(data.created_at).calendar()}
          </div>
          <div className="todo-item-title">{data.title}</div>
        </div>
        <div className="todo-item-delete col-2">
          <button
            className="btn btn-delete"
            data-bs-toggle="modal"
            data-bs-target="#confDelete"
          >
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItem;
