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
                        
                    </tr>
                </thead>
            </table>
        )}

    </div>
   )
}
