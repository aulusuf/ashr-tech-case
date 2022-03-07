import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import ReadTodo from "./ReadTodo";
import DeleteTodo from "./DeleteTodo";
import DoneTodo from "./DoneTodo";
import ActiveTodo from "./ActiveTodo";
import {
  TodoListActive,
  TodoListCompleted,
  TodoListInactive,
} from "./TodoList";

const session = JSON.parse(localStorage.getItem("session"));
function Todo() {
  let config = {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  };
  // const TodoList = createContext();
  const [error, setError] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    created_at: "",
    updated_at: "",
  });
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    axios
      .get("/api/todos", config)
      .then((res) => {
        setTodoList(res.data.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  const editTodo = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/todos/${selectedTodo.id}`, selectedTodo, config)
      .then(() => {
        fetchTodos();
      });
  };
  const deleteTodo = (e) => {
    e.preventDefault();
    axios.delete(`/api/todos/${selectedTodo.id}`, config).then(() => {
      fetchTodos();
    });
  };
  const doneTodo = (e) => {
    e.preventDefault();
    axios
      .patch(
        `/api/todos/updatestatus/${selectedTodo.id}`,
        {
          status: "completed",
        },
        config
      )
      .then(() => {
        fetchTodos();
      });
  };
  const undoneTodo = (e) => {
    e.preventDefault();
    axios
      .patch(
        `/api/todos/updatestatus/${selectedTodo.id}`,
        {
          status: "active",
        },
        config
      )
      .then(() => {
        fetchTodos();
      });
  };

  return (
    <>
      <CreateTodo />
      <ReadTodo
        data={selectedTodo}
        setData={setSelectedTodo}
        edit={(e) => editTodo(e)}
      />
      <DeleteTodo setData={selectedTodo} delete={(e) => deleteTodo(e)} />
      <DoneTodo setData={selectedTodo} check={(e) => doneTodo(e)} />
      <ActiveTodo setData={selectedTodo} uncheck={(e) => undoneTodo(e)} />
      <div
        className="bg-light py-1"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p className="me-2" style={{ margin: "auto 0", fontWeight: "bold" }}>
          {session.data.name}
        </p>
        <button type="button" onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>

      <h1 className="text-center mt-5">ToDo List</h1>

      <div className="todo-list">
        <div className="todo-item row">
          {" "}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createTodo"
          >
            Add Todo
          </button>
        </div>
        <p>{error}</p>
        <div>
          <p className="fw-bold mt-3 text-center">On Going</p>
          <TodoListActive data={todoList} setData={setSelectedTodo} />
        </div>
        <div>
          <p className="fw-bold mt-3 text-center">Completed</p>
          <TodoListCompleted data={todoList} setData={setSelectedTodo} />
        </div>
        <div>
          <p className="fw-bold mt-3 text-center">Done</p>
          <TodoListInactive data={todoList} setData={setSelectedTodo} />
        </div>
      </div>
    </>
  );
}

export default Todo;
