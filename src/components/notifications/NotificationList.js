import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AddFriend } from "../friends/AddFriend"
import "./Notification.css"

export const NotificationList = () => {
    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    const [currentUser, setCurrentUser] = useState({})
    const [allUserNotifications, setAllUserNotifications] = useState([])
    const [hasNotifications, setHasNotifications] = useState(true)

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setCurrentUser(singleUser)
                })

            fetch(`http://localhost:8088/notifications/?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setAllUserNotifications(data)
                    }
                    else {
                        setHasNotifications(false)
                    }
                })
        },
        []
    )

    const AddFriend = (notification) => {
        const d = new Date();
        let date = d.toISOString()
    
        let newFriend = {
            requesterId: notification.userSender,
            accepterId: currentUser.id,
            date: date
        }
    
        return fetch('http://localhost:8088/friendsList', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newFriend)
                    })
                        .then(response => response.json())
                        .then(() => {
                            fetch(`http://localhost:8088/notifications/${notification.id}`, { method: "DELETE" })
                            .then(response => response.json())
                            .then(() => {
                                fetch(`http://localhost:8088/notifications/?userId=${localUserObject.id}`)
                                    .then(response=>response.json())
                                    .then((data) => {
                                        if(data.length !== 0) {
                                            setAllUserNotifications(data)
                                        }
                                        else {
                                            setHasNotifications(false)
                                        }
                                    })
                                })
                        })
    
    
    }

    const denyFriend = (notification) => {
        fetch(`http://localhost:8088/notifications/${notification.id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/notifications/?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setAllUserNotifications(data)
                    }
                    else {
                        setHasNotifications(false)
                    }
                })
            }
        )
    }

    return <>
    <section className="header">
            <h1 className="logo" onClick={() => navigate("/")}>Play Again</h1>
            <h1 className="headerTitle">Notifications</h1>
    </section>
    <section className="notifications-list">
        {hasNotifications ? <>
            {allUserNotifications.map(notification => {
            return <section className="notification">
                        <div>You have a {notification.contents} from <Link to={`/profile/${notification.userSender}`}>{notification.userSenderName}</Link>.</div>
                        <button onClick={() => {AddFriend(notification)}}>Accept</button>
                        <button onClick={() => {denyFriend(notification)}}>Deny</button>
                    </section>
            })}
        </> : <div className="notification">No notifications.</div>}
    </section>
    </>
}