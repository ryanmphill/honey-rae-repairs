import { useEffect, useState } from "react"
import "./EmployeeList.css"
import { Employee } from "./Employee"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true&_embed=employees`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return <article className="employees">
        {
            // NOTE: The 'key' has to be in the component that is creating the list of items to display
            employees.map(employee => <Employee key={`employee--${employee.id}`} 
                                id={employee.id} 
                                fullName={employee.fullName} 
                                email={employee.email} />)
        }
    </article>
}