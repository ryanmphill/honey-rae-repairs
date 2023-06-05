export const TicketSearch = ({setterFunction}) => {
    return (
        <div>
            <input id="ticketSearchBar"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter Search Terms" />
        </div>
    )
}