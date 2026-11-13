import { useEffect, useState } from "react";
function employeeform({
    onAddEmployee,
    editingEmployee,
    onUpdateEmployee,
    onUpdateEmployee,
    onCancelEdit
}){
    const [form,setForm]=useState({
        name:"",
        email:"",
        department:"",
        salary:""
    })
    useEffect(()=>{
        if(editingEmployee){
         setForm({
            name:editingEmployee.name,
            email:editingEmployee.email,
            department:editingEmployee.department,
            salary:editingEmployee.salary
         })
        }
        else{
            setForm({
                name:"",
                email:"",
                department:"",
                salary:""

            })
        }

    },[editingEmployee])
    const handleChange=(e)=>{
        const {name, value}=e.target;
        setForm({
            ...form,
            [name]:value
        })
    }
    
    const handlesubmit=(e)=>{
        e.preventdefault();
        if(!form.name||!form.email||form.department|| !form.salary)
        {
            alert("fill the all section carefully");
            return;

        }
        if(form.sala)
        if(editingEmployee){
             onUpdateEmployee({
                ...editingEmployee,
                ...form,
                salary:number(form.salary)
         })

        }
        else{
            onAddEmployee({
                id:date.now(),
                ...form,
                salary:number(form.salary)
            })
            
        }
        setForm({
            name:"",
            email:"",
            department:"",
            salary:""
        });


    };
return(
    <div className="fformfil">
        <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}edi</h2>
        <form onsubmit={handlesubmit}>
         <input
         type="text"
         name="name"
         placeholder="employeename"
         value={form.name}
        onChange={handleChange}
         />
         <input
         type="text"
         name="name"
         placeholder="employeeemail"
         value={form.email}
         onChange={handleChange}
         />
        <select 
        name="department"
        value={form.department}
        onChange={handleChange}
        >
        <option value="">select department</option>
        <option value="it">it</option>
        <option value="hr">it</option>
        <option value="finance">it</option>
        <option value="marketiing">it</option>
        </select>
        <input
        type="number"
        name="salary"
        placeholder="employeesalary"
        value={form.salary}
        onChange={handleChange}
        />
   <button type="submit">{editingEmployee ? "UpdateEmployee" : "AddEmployee"}</button>
   {editingEmployee&& <button type="submit" onClick={onCancelEdit}>cancel</button>}
        </form>
    </div>
);
}
export default employeeform;
