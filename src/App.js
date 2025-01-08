import "./App.css";
import react, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const task = {
    name: "",
    id: 0,
    status: "ACTIVE" | "DONE",
  };
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [filterState, setFilterState] = useState("ALL");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckbox = (id) => {
    const Newtodos = todo.map((todo) => {
      if (id === todo.id) {
        return { ...todo, status: todo.status === "DONE" ? "ACTIVE" : "DONE" };
      } else {
        return todo;
      }
    });
    setTodo(Newtodos);
  };

  const handleFilterState = (state) => {
    setFilterState(state);
  };

  const handleAddButton = () => {
    if (inputValue.length === 0) {
      setError("Please enter todo task");
      return;
    } else {
      setError("");
      setTodo([...todo, { name: inputValue, id: uuidv4(), status: "ACTIVE" }]);
      setInputValue("");
    }
  };

  const handleDeleteButton = (task) => {
    const deleteTodo = todo.filter((todo) => todo.id !== task.id);
    setTodo(deleteTodo);
  };

  const noCompletedTask = todo.filter((todo) => todo.status === "DONE");
  const noActivedTask = todo.filter((todo) => todo.status === "ACTIVE");

  return (
    <div className="App-header">
      <div className="App">
        <h1>To-Do list</h1>
        <div className="flex">
          <input
            className="inputChange"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          <button
            className="addButton"
            onClick={handleAddButton}
            onKeyDown={(event) => {
              if (event.key === "enter") {
              }
            }}
          >
            Add
          </button>
        </div>
        {error.length > 1 && <div>{error}</div>}
        <div id="filterState">
          <div onClick={() => handleFilterState("ALL")}>ALL</div>
          <div onClick={() => handleFilterState("ACTIVE")}>ACTIVE</div>
          <div onClick={() => handleFilterState("DONE")}>DONE</div>
        </div>
        {todo.length === 0 && filterState === "ALL" && (
          <div>No tasks yet. Add new task!</div>
        )}
        {noActivedTask.length === 0 && filterState === "ACTIVE" && (
          <div>No tasks yet. Add new task!</div>
        )}
        {noCompletedTask.length === 0 && filterState === "DONE" && (
          <div>No tasks yet. Add new task!</div>
        )}
        {todo
          .filter((todo) => {
            if (filterState === "ALL") {
              return true;
            } else {
              return todo.status === filterState;
            }
          })
          .map((todo, index) => {
            return (
              <div className="taskSection" key={index}>
                <div>
                  <input
                    type="checkbox"
                    checked={todo.status === "DONE"}
                    onChange={() => handleCheckbox(todo.id)}
                  ></input>
                  {todo.name}
                </div>
                <button onClick={() => handleDeleteButton(todo)}>DELETE</button>
              </div>
            );
          })}
        <div className="flex">
          <div>Powered by</div>
          <a href="https://pinecone.mn/">Pinecone academy</a>
        </div>
      </div>
    </div>
  );
}
export default App;
