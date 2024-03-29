import { useEffect, useState } from "react"

export const EditBio = ({id, isUser}) => {
    const [user, updateBio] = useState({
        bio: ""
    })
    const [edit, setEdit] = useState(false)
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000)
        }
    }, [feedback])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${id}`)
                .then(response => response.json())
                .then((data) => {
                    const customerObject = data[0]
                    updateBio(customerObject)
                })

        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/users/${id}`, {
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

    return <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
    </div>
            <h4 className="aboutMe">About Me</h4>
    {isUser ? <>{edit ? <>
    <fieldset className="bioInput">
        <div className="form-group">
            <input
                required autoFocus
                type="text"
                className="form-control"
                value={user.bio}
                onChange={
                    (evt) => {
                        const copy = {...user}
                        copy.bio = evt.target.value
                        updateBio(copy)
                    }
                } />
        </div>
    </fieldset>
    <button onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                    setEdit(false)
                }}
                className="btn btn-primary">
                Save
            </button>
            </> : <>
            <div className="userBio">{user.bio}</div>
            <button className="editProfileButton" onClick={() => {setEdit(true)}}>Edit</button>
            </> }</> : <div className="userBio">{user.bio}</div>}
    </>
}