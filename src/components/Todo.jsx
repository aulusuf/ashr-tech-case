import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";
import ReadTodo from "./ReadTodo";
import DeleteTodo from "./DeleteTodo";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const session = JSON.parse(localStorage.getItem("session"));

    console.log();
    let config = {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    };
    axios
      .get("https://todos.data.my.id/api/todos", config)
      .then((res) => {
        setLoading(false);
        setTodoList(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("session");
    // window.location.reload();
    navigate("/");
  };
  return (
    <div>
      <div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
      <CreateTodo />
      <ReadTodo />
      <DeleteTodo />
      <h1 className="text-center mt-5">ToDo List</h1>

      <div className="add-section text-center">
        <button
          type="button"
          className="btn btn-add"
          data-bs-toggle="modal"
          data-bs-target="#createTodo"
        >
          Add Todo
        </button>
      </div>
      <div className="todo-list">
        {loading ? (
          <p>Loading...</p>
        ) : todoList ? (
          todoList.map((todo) => {
            return <TodoItem data={todo} key={todo.id} />;
          })
        ) : (
          <p>Create your todo</p>
        )}
      </div>
    </div>
  );
}

export default Todo;
