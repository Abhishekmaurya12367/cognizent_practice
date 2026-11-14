
import { useState } from 'react'
import './App.css'
import Employeeform from "./components/Employeeform"
import Employeelist from "./components/Employeelist"

function App() {

  const [employee, setEmployee] = useState([]);
  const [editemployee, setEditemployee] = useState(null);

  // Add new employee
  const handleaddemployee = (newemployee) => {
    setEmployee((prev) => [...prev, newemployee]);
  }

  // Update employee
  const handleupdateemployee = (updatedemployee) => {
    setEmployee((prev) =>
      prev.map((emp) =>
        emp.id === updatedemployee.id ? updatedemployee : emp
      )
    );

    setEditemployee(null);
  }

  // Edit employee
  const handledit = (employee) => {
    setEditemployee(employee);
  }

  // Delete employee
  const handledeleteemployee = (id) => {
    setEmployee((prev) =>
      prev.filter((emp) => emp.id !== id)
    );
  }

  // Cancel editing
  const handlecancel = () => {
    setEditemployee(null);
  }

  return (
    <div className="management">

      <h1>Employee Management System</h1>

      <Employeeform
        onAddEmployee={handleaddemployee}
        editingEmployee={editemployee}
        onUpdateEmployee={handleupdateemployee}
        onCancelEdit={handlecancel}
      />

      <Employeelist
        employees={employee}
        onEdit={handledit}
        onDelete={handledeleteemployee}
      />

    </div>
  )
}

export default App;
