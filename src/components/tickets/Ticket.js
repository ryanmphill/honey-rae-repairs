import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, isStaff, employees }) => {

    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const employeeTicketObject = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === employeeTicketObject.employeeId)
    }

    return <>
        <section className="ticket">
            <header>
                {
                    isStaff
                        ? <>Ticket {ticketObject.id}</>
                        : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
            <footer>
                {
                    ticketObject.employeeTickets.length !== 0
                     ? `Currently being worked on ${assignedEmployee !== null ? "by " + assignedEmployee.user.fullName : ""}`
                     : <button>Claim</button>
                } 
            </footer>
        </section>
    </>
}