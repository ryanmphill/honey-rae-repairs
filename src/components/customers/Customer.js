import { Link } from "react-router-dom"

export const Customer = ({id, fullName, phone, address}) => {

    return <section className="customer">
                        <div>
                            <Link to={`/customers/${id}`}>Name: {fullName}</Link>
                        </div>
                        <div>Phone Number: {phone}</div>
                        <div>Home Address: {address}</div>
                    </section>

}