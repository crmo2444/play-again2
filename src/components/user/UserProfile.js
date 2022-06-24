import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
    const [user, setUser] = useState({})

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${userId}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setUser(singleUser)
                })

            fetch(`http://localhost:8088/users?id=${localUserObject.id}`)
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
                    currentUserObj={currentUser}
                    otherUserObj={user} />
                </section>
            </>
        }
        
    }

    return <>
    <section className="header">
        <h1 className="logo" onClick={() => navigate("/")}>Play Again</h1>
        <h1 className="headerTitle">{user.firstName}'s Profile</h1>
    </section>
    <section className="profileDetails">
        <section className="profileName">
            <div>{user.firstName} {user.lastName}</div>
        </section>
        <section className="profilePicture">
            <img className="picture" src={user.profilePicture} alt="profile-picture"/>
        </section>
        {showSettings()}
    </section>
    </>
}