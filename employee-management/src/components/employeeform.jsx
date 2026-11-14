
import { useEffect, useState } from "react";

function Employeeform({
  onAddEmployee,
  editingEmployee,
  onUpdateEmployee,
  onCancelEdit
}) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  // Update form when an employee is selected for editing
  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name,
        email: editingEmployee.email,
        department: editingEmployee.department,
        salary: editingEmployee.salary
      });
    } else {
      setForm({
        name: "",
        email: "",
        department: "",
        salary: ""
      });
    }
  }, [editingEmployee]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handlesubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.department ||
      !form.salary
    ) {
      alert("Fill all sections carefully");
      return;
    }

    if (Number(form.salary) <= 0) {
      alert("Salary must be greater than 0");
      return;
    }

    if (editingEmployee) {

      // Update existing employee
      onUpdateEmployee({
        ...editingEmployee,
        ...form,
        salary: Number(form.salary)
      });

    } else {

      // Add new employee
      onAddEmployee({
        id: Date.now(),
        ...form,
        salary: Number(form.salary)
      });

    }

    // Reset form
    setForm({
      name: "",
      email: "",
      department: "",
      salary: ""
    });
  };

  // Handle cancel
  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <div className="fformfil">

      <h2>
        {editingEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handlesubmit}>

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Employee Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <button type="submit">
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}

      </form>
    </div>
  );
}

export default Employeeform;
