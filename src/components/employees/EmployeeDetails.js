import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {

    /* 
    Here is where we will extract and capture the employeeId. The 'hook' in react router DOM
    is called useParams(). Much like the 'props', the react router DOM takes any route parameters 
    in the URL and puts them in an object, which we can then 'deconstruct'.  
    */
    const {employeeId} = useParams()

    // Make a state variable for the employee
    const [employee, updateEmployee] = useState()

    //Observe when employeeId changes with useEffect
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then(response => response.json())
                .then((employeeData) => {
                    const singleEmployeeObject = employeeData[0]
                    updateEmployee(singleEmployeeObject)
                })
        },
        [employeeId]
    )

    return <>
        <section className="employee">
            <header className="employee__header">{employee?.user?.fullName}</header>
            <div>Email: {employee?.user?.email}</div>
            <div>Specialty: {employee?.specialty}</div>
            <div>Rate: ${employee?.rate?.toFixed(2)}</div>
            <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
        </section>
    </>
}