function employeeelist({
    employees,
    onEdit,
    onDelete
    }){
   return(
    <div className="list_container">
        <h2>this is the list where you can see all list of the employee</h2>
        <h2> total employee {employeeelist.length}</h2>
        {employeeelist.length===0?(<p>employee not found</p>):(
            <table>
                <thead>
                    <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp)=>(
                        <tr key={employees.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                            
                       <td>
                        <button onClick={()=>onEdit(emp)}>edit</button>
                       </td>
                        <td>
                        <button onClick={()=>onDelete(emp.id)}>delete</button>
                       </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </div>
   )
}
export default employeeelist;
