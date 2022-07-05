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
    const [currentFriends, setCurrentFriends] = useState([])
    const [allUsers, setAllUsers] = useState([])

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    let navigate = useNavigate()

    useEffect(
        () => {
            let friendArray = []

            fetch(`http://localhost:8088/users?id=${userId}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setUser(singleUser)
                })

            fetch(`http://localhost:8088/users`)
                .then(response=>response.json())
                .then((data) => {
                    setAllUsers(data)
                })


            fetch(`http://localhost:8088/users?id=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setCurrentUser(singleUser)
                })  

            fetch(`http://localhost:8088/friendsList?requesterId=${userId}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        friendArray.push(data)
                    }
                })
                .then(() => {
                    fetch(`http://localhost:8088/friendsList?accepterId=${userId}`)
                        .then(response=>response.json())
                        .then((data) => {
                            if(data.length !== 0) {
                                friendArray.push(data)
                            }
                        })
                })
                
            setCurrentFriends(friendArray)
        },
        []
    )
/* 
    useEffect(
        () => {
            let friendArray = []

            allFriends.map(friend => {
                if(friend.requesterId === user.id) {
                    let foundFriend = allUsers.find(obj => obj.id === friend.accepterId)
                    friendArray.push(foundFriend)
                } 
                
                else if(friend.accepterId === user.id) {
                    let foundFriend = allUsers.find(obj => obj.id === friend.requesterId)
                    friendArray.push(foundFriend)
                }
            })

            setCurrentFriends(friendArray)
        },
        [allFriends, allUsers]
    ) */

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

    const friends = () => {
        if(currentFriends.length !== 0) {
            currentFriends.map(friend => {
                if(friend.requesterId === parseInt(userId)) {
                    let foundFriend = allUsers.find(obj => obj.id === friend.requesterId)
                    console.log(foundFriend)
                    return <div>Hiii</div>
                } 
                
                else if(friend.accepterId === parseInt(userId)) {
                    let foundFriend = allUsers.find(obj => obj.id === friend.accepterId)
                    console.log(foundFriend)
                    return <div>Hi</div>
                }
            })
        } 
        else {
            return <div>No friends yet.</div> 
        }

        console.log('hello')
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
    <section className="friendsList">
        <div>Friends List:</div>
        {currentFriends ? <>{friends()}</> : <div>Test</div>}
    </section>
    </>
}