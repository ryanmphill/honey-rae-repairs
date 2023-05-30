import { useEffect, useState } from "react"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])

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

    return <>
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
