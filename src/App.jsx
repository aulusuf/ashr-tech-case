import "./css/main.css";
import TodoItem from "./components/TodoItem";

function App() {
  return (
    <div className="container">
      <h1 className="text-center">ToDo List</h1>
      <div className="add-section text-center">
        <button className="btn btn-add">Add Todo</button>
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
