import { useEffect, useState } from "react"
import { keys } from "../../Settings"
import { EditProfilePicture } from "./EditProfilePicture"
import "./Profile.css"

export const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState({})

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setCurrentUser(singleUser)
                })
        },
        []
    )

    return <section className="profileDetails">
        <div className="profilePicture"><img className="picture" src={currentUser.profilePicture}/></div>
        <div><EditProfilePicture id={localUserObject.id} userObject={currentUser}/></div>
    </section>
}