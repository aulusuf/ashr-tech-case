import React from "react";

function TodoItem() {
  return (
    <div className="todo-item row">
      <div className="todo-item-check col-2">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="todo-check"
        />
        <label for="todo-check" />
      </div>
      <div className="todo-item-content col-8">
        <div className="todo-item-date">date</div>
        <div className="todo-item-title">title</div>
      </div>
      <div className="todo-item-delete col-2">
        <button className="btn btn-delete">
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
