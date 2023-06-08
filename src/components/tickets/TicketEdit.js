import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    // Retrieve the selected ticket id with useParams()
    const {ticketId} = useParams()

    // Set initial state for ticket
    const [ticket, updateTicket] = useState({
        userId: 0,
        description: "",
        emergency: false,
        dateCompleted: ""
    })

    // Assign useNavigate to a variable
    const navigate = useNavigate()

    // Make a fetch call to get the current selected ticket information
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
                .then(res => res.json())
                .then((data) => {
                    updateTicket(data)
                })
        },
        []
    )

    // Define state for feedback to be set when profile is updated.
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            }
        },
        [feedback]
    )

    // Handle the save button click event
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        /* Perform the PUT fetch() call here to update the profile.
        Navigate user to ticket list when done. */
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(res => res.json())
        .then((data) => {
            console.log("Successfully updated Service Ticket", data)
            setFeedback("Ticket successfully edited. Returning to customer's tickets...")
        })
        .then(() => {
            // Wait three seconds, then navigate to home page
            setTimeout(() => {navigate("/tickets")}, 3000)
        })

    }

    return <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
    </div>
    <form className="ticketEditForm">
            <h2 className="ticketEditForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group ticketEditdesc">
                    <label htmlFor="ticketEdit--description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        id="ticketEdit--description"
                        value={ticket.description}
                        onChange={
                            (changeEvent) => {
                                const copy = {...ticket}
                                copy.description = changeEvent.target.value
                                updateTicket(copy) // Updating ticket with value of copy
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        checked={ticket.emergency}
                        onChange={
                            (changeEvent) => {
                                const copy = {...ticket}
                                copy.emergency = changeEvent.target.checked // captures true if checked, false if unchecked
                                updateTicket(copy) // Updating ticket with value of copy
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={ (clickEvent) => {handleSaveButtonClick(clickEvent)} }
                className="btn btn-primary">
                Submit Ticket Edits
            </button>
        </form>
    </>
}