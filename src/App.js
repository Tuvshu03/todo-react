import "./App.css";
import react, { useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.value);\
    setInputValue(event.target.value);
  };

  const handleAddButton = () => {
    setTodo([...todo, inputValue]);
    setInputValue("");
  };

  return (
    <div className="App">
      <input value= {inputValue} onChange={handleInputChange}></input>
      <button onClick={handleAddButton}>Add</button>  
      {todo.map((todo) => {
        return <div>{todo}</div>;
      })}
    </div>
  );
}

export default App;
