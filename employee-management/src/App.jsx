import { useState } from 'react'
import './App.css'
import employeeform from "../components/employeeform"
import employeelist from "../components/employeelist"
function App() {
const [employee,setEmployee]=useState([]);
const [editemployee,setEditemployee]=useState(null);
     // this is the code for the adding new employee;
    const handleaddemployee=(newemployee) => {
    setEmployee((prev)=> [...prev,newemployee]);
    }
//handle to the update employee;
const handleupdateemployee=(updateempoyee) => {
  setEmployee((prev)=> prev.map((emp)=> emp.id===updateempoyee.id ? updateempoyee :emp));
  setEditemployee(null);
  
}
//handle the editemployee but i am not getting this things that how it is managing 
const handledit=(employee)=>{
  setEditemployee(employee);
}
//delete data employee
const handledeleteemployee=(id)=>{
  setEmployee((prev)=> prev.filter((emp)=> emp.id !== id));
}
// handle the cancel
const handlecancel=()=>{
  setEditemployee(null);
}
  return (
    <div classname="management">
      <h1>this is the management where we are performing the some attractive</h1>
      <employeeform
      onAddEmployee={handleaddemployee}
      editingEmployee={handledit}
      onUpdateEmployee={handleupdateemployee}
      onCancelEdit={handlecancel}
      />
      <employeelist
       employees={employees}
        onEdit={handledit}
        onDelete={handledeleteemployee}
      />
      
      
    </div>
  )
}

export default App;
// now everythings is good according to the 
