import { useEffect, useState } from "react"
import { CgCloseO} from 'react-icons/cg'

export const EditProfileSettings = ({setEdit}) => {

    // TODO: Provide initial state for profile
    const [user, updateUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        profilePicture: "",
        bio: ""
    })

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000)
        }
    }, [feedback])

    // TODO: Get customer profile info from API and update state
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${localUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const customerObject = data[0]
                    updateUser(customerObject)

                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       

        fetch(`http://localhost:8088/users/${localUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Profile successfully saved!")
            })
    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        <form className="profile">
            <section className="topHeader">
            <h2 className="profile__title">Update Profile</h2>
            <div className="close"><CgCloseO size={30} onClick={() => {setEdit(false)}}/></div>
            </section>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.firstName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.firstName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.lastName}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.lastName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        className="form-control"
                        value={user.password}
                        onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.password = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                }}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}