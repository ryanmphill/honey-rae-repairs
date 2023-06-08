import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CustomerForm = () => {
    // Provide initial state for customer form
    const [profile, updateProfile] = useState(
        {
            address: "",
            phoneNumber: "",
            userId: 0
        }
    )

    // Assign useNavigate to a variable
    const navigate = useNavigate()

    // Get the current customers user id, and then get customer info from API
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
                .then(res => res.json())
                .then((data) => {
                    const employeeObject = data[0]
                    updateProfile(employeeObject)
                })
        },
        [honeyUserObject.id]
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

    // Handle the save button click to make edits to profile
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        /* Perform the PUT fetch() call here to update the profile.
        Navigate user to home page when done. */
        fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(res => res.json())
        .then((data) => {
            console.log("Successfully updated profile", data)
            setFeedback("Customer profile successfully saved")
        })
        .then(() => {
            // Wait three seconds, then navigate to home page
            setTimeout(() => {navigate("/")}, 3000)
        })
    }

    return <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profile-address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        id="profile-address"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profile-phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        id="profile-phoneNumber"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>
}