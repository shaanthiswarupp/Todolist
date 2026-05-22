import React, { useEffect, useState } from 'react'
import "./App.css";

const App = () => {

  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  //const [todos, setTodos] = useState([{text:"welcome to todoList", date:"2026-05-15 10:00:00 AM", completed:false},]);

  // for save data 
  const [todos, setTodos] = useState( ()=> {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos): [{text:"welcome to todoList", date:"2026-05-15 10:00:00 AM", completed:false},]
  });

  useEffect( ()=>{ localStorage.setItem("todos", JSON.stringify(todos)); }, [todos] );


  const addTodo=()=>{
    if(!task.trim() ) return
    const newTodo = { text:task, date: new Date().toLocaleDateString, completed:isCompleted, };
    setTodos([...todos, newTodo]);
    setTask("");
    isCompleted(false);

  }


  // const addTodo=()=>{
  //   if(!task.trim() ) return
  //   const newTodo = { text:task, date: new Date().toLocaleDateString, completed:isCompleted, };
  //   setTodos([...todos, newTodo]);
  //   setTask("");
  //   isCompleted(false);

  // }
  const toggleCompleted=(index)=>{
    const newTodos = [...todos];
    newTodos[index].completed =!newTodos[index].completed;
    setTodos(newTodos);

  }
  const deleteTodo=(index)=>{
    const newTodos =[...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);

  }

  return (
    <div className='container'>
      <h1 className='title'>TodoList</h1>
      

      <div className='input-section'>
        <input className='input-box' type='text' placeholder='Enter your todo' value={task} onChange={(e)=> setTask(e.target.value)}/>
        <label className='checkbox-lable'>
          <input className="checkbox" type="checkbox" checked={isCompleted} onChange={(e)=>setIsCompleted()} />
          Completed?
        </label>
        <button className='add-btn green' onClick={addTodo}>Add</button>
      </div>
      <ul className='todo-list'>
        {
          todos.map( (todo,index) => (
            <li className={`todo-item ${todo.completed ? "completed":"not-completed"}`}>

              <div className='todo-info'>
                <div className='todo-text-date'>
                    <p className='todo-text'>{todo.text}</p>
                    <small className='todo-date'>{todo.date}</small>
                </div>                
              </div>  

              <div className='actions'>   
                <button className={`status-btn ${todo.completed?"green":"red"} `} onClick={()=>toggleCompleted(index) }>
                  {todo.completed ? "Mark Not Done":"Mark Done"}</button>   
                <button className='delete-btn' onClick={()=> deleteTodo(index)}> {"\u{1f5d1}"} </button>               
              </div>  

            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App

