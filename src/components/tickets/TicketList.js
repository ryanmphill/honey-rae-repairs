import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"
import { Ticket } from "./Ticket"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false) // We don't want to show only emergency by default, so we set it to false
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            // Fetch service tickets with employee tickets embedded
            fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
            // Fetch Employees with user expanded
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                // For employees
                setFilteredTickets(tickets)
            } else {
                // For customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFilteredTickets(emergencyTickets)
            } else {
                setFilteredTickets(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTickets = tickets.filter(
                    (ticket) => {
                        return ticket.dateCompleted === "" && ticket.userId === honeyUserObject.id
                    }
                )
                setFilteredTickets(openTickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets)
            }
        },
        [openOnly]
    )

    // Observe the searchTermState from the parent container
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredTickets(searchedTickets)
        },
        [ searchTermState ]
    )

    return <>
        {
            honeyUserObject.staff // If the current user is staff, show the filter buttons, else, show create ticket button
                ? <>
                    <button onClick={ () => {setEmergency(true)} }>Emergency Only</button>
                    <button onClick={ () => {setEmergency(false)} }>Show All</button>
                </>
                : <>
                    <button onClick={ () => navigate("/ticket/create") }>Create Ticket</button>
                    <button onClick={ () => updateOpenOnly(true) }>Open Tickets</button>
                    <button onClick={ () => updateOpenOnly(false) }>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => <Ticket employees={employees} isStaff={honeyUserObject.staff} ticketObject={ticket} key={`ticket--${ticket.id}`} />
                )
            }

        </article>
    </>
}
