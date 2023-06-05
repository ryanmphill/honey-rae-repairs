import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"


export const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false&_embed=customers`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )

    return <article className="customers">
        {
            // NOTE: The 'key' has to be in the component that is creating the list of items to display
            customers.map(customer => <Customer key={`customer--${customer.id}`} 
                                id={customer.id} 
                                fullName={customer.fullName} 
                                phone={customer.customers[0]?.phoneNumber}
                                address={customer.customers[0]?.address} />)
        }
    </article>
}