import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AddFriend } from "../friends/AddFriend"

export const NotificationList = () => {
    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    const [currentUser, setCurrentUser] = useState({})
    const [allUserNotifications, setAllUserNotifications] = useState([])
    const [hasNotifications, setHasNotifications] = useState(true)

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

    return <>
    <h1>Notifications</h1>
    <section className="notifications-list">
        {hasNotifications ? <>
            {allUserNotifications.map(notification => {
            return <section className="notification">
                        <div>You have a {notification.contents} from <Link to={`/profile/${notification.userSender}`}>{notification.userSenderName}</Link>.</div>
                        <button onClick={() => {<AddFriend accept={true}/>}}>Accept</button>
                        <button>Deny</button>
                    </section>
            })}
        </> : <div>No notifications.</div>}
    </section>
    </>
}