import { useState } from "react";

function App(){
  const[todo,setTodo]=useState("");
  const[todos,setTodos]=useState([]);
  function addtodo(e){
    if(todo.trim()===" "){
      return ;
    }
    if(!todos.includes(todo)){
   let final=[...todos,todo];
    setTodos(final);
      setTodo("");
    }
    // setTodo("");
    else{
       alert("todos already present in the database");
    }
    e.preventDefault();
  }

  function deletetodo(index)
  {
  const final=[];
  for(let i=0;i<todos.length;i++)
  {
   if(i!==index){
    final.push(todos[i]);

   }
   setTodos(final);
   
  }
  }
  return(
   <div className="app">
   <h1>this is the my first todo list</h1>
   <form onSubmit={addtodo}>
   <input type="text"
   placeholder="enter your todo"
   value={todo}
   onChange={(e)=>setTodo(e.target.value)}
   />
   <button type="submit">save</button>
   </form>
  <ul>
    {todos.map((item,index)=>(
      <li key={index}>
      {item}
   <button onClick={()=>deletetodo(index)}>delete</button>
   </li>
    ))
    }
  </ul>
   
   </div>
  )
};
export default App;