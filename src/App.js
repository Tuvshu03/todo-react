import "./App.css";
import react, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const task = {
    name: "",
    id: 0,
    status: "ACTIVE" | "DONE"
  };
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [filterState, setFilterState] = useState("ALL");
  const [noTask, setNoTask] = useState("No tasks yet. Add task!")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckbox = (id) => {
    const Newtodos = todo.map((todo) => {
      if (id === todo.id) {
        return { ...todo, status: todo.status === "DONE" ?"ACTIVE" :"DONE" };
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
console.log()
  
  // const handleNoTask = () =>{
  //   if(todo.filter().length!==0){
  //     setNoTask("")
  //   }
  // }

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
          <button className="addButton" onClick={handleAddButton}>Add</button>
        </div>
        {error.length > 1 && <div>{error}</div>}
        <div id="filterState">
          <div onClick={() => handleFilterState("ALL")}>ALL</div>
          <div onClick={() => handleFilterState("ACTIVE")}>ACTIVE</div>
          <div onClick={() => handleFilterState("DONE")}>DONE</div>
        </div>
        <div style={{display: todo.length===0 ?"flex" :"none"}}>No tasks yet. Add task!</div>
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
              <div key={index}>
                <input
                  type="checkbox"
                  checked={todo.status === "DONE"}
                  onChange={() => handleCheckbox(todo.id)}
                ></input>
                {todo.name}
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
