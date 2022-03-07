import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import ReadTodo from "./ReadTodo";
import DeleteTodo from "./DeleteTodo";
import DoneTodo from "./DoneTodo";
import ActiveTodo from "./ActiveTodo";
import moment from "moment";
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
  const initialValue = {
    title: "",
    description: "",
    start: "",
    end: "",
  };
  // const TodoList = createContext();
  const [error, setError] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [formTodo, setFormTodo] = useState(initialValue);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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

  const handleSubmit = () => {
    let data = {
      ...formTodo,
      start: moment(startDate).format("YYYY-MM-DD 00:00:00"),
      end: moment(endDate).format("YYYY-MM-DD 00:00:00"),
    };
    // console.log(data);
    // console.log(config);
    postAPI(data);
    // fetchTodos();
    // window.location.reload();
  };
  const postAPI = (data) => {
    axios
      .post("/api/todos", data, config)
      .then((res) => {
        fetchTodos();
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCreate = (e) => {
    const { name, value } = e.target;
    setFormTodo({
      ...formTodo,
      [name]: value,
    });
  };

  return (
    <>
      <CreateTodo
        submit={(e) => handleSubmit(e)}
        change={(e) => handleCreate(e)}
        start={(date) => setStartDate(date)}
        end={(date) => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
      />
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
            Prepare your Todo!
          </button>
        </div>
        <p>{error}</p>
        <div>
          <p className="fw-bold mt-3 text-center">On Going</p>
          <TodoListActive data={todoList} setData={setSelectedTodo} />
        </div>
        <div>
          <div>
            <p className="fw-bold mt-3 text-center">Be ready</p>
            <TodoListInactive data={todoList} setData={setSelectedTodo} />
          </div>
        </div>
        <p className="fw-bold mt-3 text-center">Completed</p>
        <TodoListCompleted data={todoList} setData={setSelectedTodo} />
      </div>
    </>
  );
}

export default Todo;
