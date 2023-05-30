import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false) // We don't want to show only emergency by default, so we set it to false
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
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
                    (ticket) => {
                        return <section className="ticket" key={`ticket--${ticket.id}`}>
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }

        </article>
    </>
}
