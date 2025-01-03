import "./App.css";
import react, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const task = {
    name:'',
    id:0,
    status:"ACTIVE" | "DONE"
  }
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError]= useState("");
  const [filterState, setFilterState] = useState("ALL")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckbox = (id) =>{
   const Newtodos = todo.map((todo)=>{
      if(id===todo.id){
       return {...todo, status: "DONE"}
      }
      else{
        return todo;
      }
    });
    setTodo(Newtodos);
  }
  console.log(todo)

  const handleFilterState = (state) =>{
    setFilterState(state)
    
  }
  const changeStatus = (id) =>{
    todo.map((todo)=>{
      if(id===todo.id){
       return 
      }
      else{
        return todo;
      }
  })

  const handleAddButton = () => {
    if(inputValue.length===0){  
      setError('Please enter todo task');
      return;
    }
    else{
      setError('');
      setTodo([...todo, {name:inputValue,  id:uuidv4(), status:"ACTIVE"}]);
      setInputValue("");
    }
  };

  return (
    <div className="App">
      <div>To-Do list</div>
      <input placeholder="Add a new task..." value = {inputValue} onChange={handleInputChange}></input>
      <button onClick={handleAddButton}>Add</button>
      {error.length > 1 && <div>{error}</div>}
      <div>
        <div onClick={()=> handleFilterState("ALL")}>ALL</div>
        <div onClick={()=> handleFilterState("ACTIVE")}>ACTIVE</div>
        <div onClick={()=> handleFilterState("DONE")}>DONE</div>
      </div>
      {todo.filter((todo)=>{
        if(filterState==="ALL"){
          return true;
        }
        else{
          return todo.status === filterState;
        }
      }).map((todo, index) => {
        return <div>
          <input type="checkbox" checked={todo.status === 'DONE'} onChange={()=>handleCheckbox(todo.id)} ></input>
          {todo.name}</div>;
      })}
    </div>
  );
}
}
  export default App
