import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const CustomerDetails = () => {

    /* 
    Here is where we will extract and capture the customerId. The 'hook' in react router DOM
    is called useParams(). Much like the 'props', the react router DOM takes any route parameters 
    in the URL and puts them in an object, which we can then 'deconstruct'.  
    */
    const {customerId} = useParams()

    // Add state variable for a single customer
    const [customer, updateCustomer] = useState()

    

    //Observe when customerId changes with useEffect
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((customerData) => {
                    // The url points to an array of one object, so we get the single object
                    const singleCustomerObject = customerData[0]
                    updateCustomer(singleCustomerObject)
                })
        },
        [customerId]
    )

    return <>
        <section className="customer">
            <header className="customer__header">{customer?.user?.fullName}</header>
            <div>Phone Number: {customer?.phoneNumber}</div>
            <div>Home Address: {customer?.address}</div>
            <footer className="customer__footer">Get in touch with {customer?.user?.fullName} at {customer?.user?.email}</footer>
        </section>
    </>
}