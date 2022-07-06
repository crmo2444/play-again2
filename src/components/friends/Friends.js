import { useEffect, useState } from "react"
import { AddFriend } from "./AddFriend"
import { DeleteFriend } from "./DeleteFriend"
import { IoMdArrowForward } from 'react-icons/io'
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";


export const Friends = ({currentUserObj, otherUserObj}) => {
    const [friendsLists, setFriendsList] = useState([])
    const [friendshipStatus, setFriendshipStatus] = useState(false)
    const [requestState, setRequestState] = useState(false)
    const [sentRequestState, setSentRequestState] = useState(false)

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/friendsList`)
                .then(response=>response.json())
                .then((data) => {
                    setFriendsList(data)
                })
        },
        []
    )

    useEffect(
        () => {
            friendsLists.map(friends => {
                if(friends.requesterId === currentUserObj.id || friends.requesterId === otherUserObj.id) {
                    if(friends.accepterId === currentUserObj.id || friends.accepterId === otherUserObj.id) {
                        setFriendshipStatus(true)
                    }
                }
            })
        },
        [friendsLists]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/notifications/?userId=${otherUserObj.id}&userSender=${currentUserObj.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setRequestState(true)
                    }
                })
                
            fetch(`http://localhost:8088/notifications/?userId=${currentUserObj.id}&userSender=${otherUserObj.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setSentRequestState(true)
                    }
                }) 
        },
        [currentUserObj, otherUserObj]
    )

    const sendFriendRequest = () => {
        let newRequest = {
            userId: otherUserObj.id,
            contents: "friend request",
            userSender: currentUserObj.id,
            userSenderName: `${currentUserObj.firstName} ${currentUserObj.lastName}`
        }

        fetch(`http://localhost:8088/notifications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRequest)
            })
            .then(response=>response.json())
            .then(() => {
                setRequestState(true)
            })
    }

    return <>
    {friendshipStatus ? <>
        <div>Friends since: </div>
        <button onClick={() => <DeleteFriend />}>Remove Friend</button>
        </> : <>
        {requestState ? <>
            {sentRequestState ? <><div className="friendStatus">{otherUserObj.firstName} sent you a friend request.</div> 
            <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "25"}}>
                    <div>
                    <IoMdArrowForward onClick={() => {navigate("/notifications")}}/>
                    </div>
                </IconContext.Provider>
            </>: <div className="friendStatus">Friend request sent.</div>}
            </> : <>
            {sentRequestState ? <><div className="friendStatus">{otherUserObj.firstName} sent you a friend request.</div> 
            <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "25"}}>
                    <div>
                    <IoMdArrowForward className="arrow" onClick={() => {navigate("/notifications")}}/>
                    </div>
            </IconContext.Provider>
            </>: <button onClick={() => sendFriendRequest()}>Add Friend</button>}
            </>}
        </>}
    </>
}