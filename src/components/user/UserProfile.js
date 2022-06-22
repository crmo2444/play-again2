import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { keys } from "../../Settings"
import { Friends } from "../friends/Friends"
import { EditBio } from "./EditBio"
import { EditProfilePicture } from "./EditProfilePicture"
import { EditProfileSettings } from "./EditProfileSettings"
import "./Profile.css"

export const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [edit, setEdit] = useState(false)
    const {userId} = useParams()

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${userId}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setCurrentUser(singleUser)
                })
        },
        []
    )

    const showSettings = () => {
        if(localUserObject.id === parseInt(userId)) {
            if (edit) {
                return <> 
                <section className="buttons">
                    <div><EditProfilePicture id={localUserObject.id} userObject={currentUser}/></div>
                    <EditProfileSettings setEdit={setEdit}/>
                </section>
                <div><EditBio id={localUserObject.id} isUser={true}/></div>
                </>
            }
    
            else {
               return <>
               <section className="buttons">
                    <div><EditProfilePicture id={localUserObject.id} userObject={currentUser}/></div>
                    <button className="editAccount" onClick={() => {setEdit(true)}}>Edit Account Settings</button>
               </section>
                <div><EditBio id={localUserObject.id} isUser={true}/></div>
               </> 
            }

        }

        else {
            return <>
                <section className="userProfile">
                    <div><EditBio id={userId} isUser={false}/></div>
                    <Friends 
                    currentUserId={localUserObject.id}
                    otherUserId={parseInt(userId)} />
                </section>
            </>
        }
        
    }

    return <section className="profileDetails">
        <div>{currentUser.firstName} {currentUser.lastName}</div>
        <div className="profilePicture"><img className="picture" src={currentUser.profilePicture} alt="profile-picture"/></div>
        {showSettings()}
    </section>
}