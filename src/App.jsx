import "./css/main.css";
import TodoItem from "./components/TodoItem";
import CreateTodo from "./components/CreateTodo";
import ReadTodo from "./components/ReadTodo";

function App() {
  return (
    <div className="container">
      <CreateTodo />
      <ReadTodo />
      <h1 className="text-center">ToDo List</h1>
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
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
}

export default App;
