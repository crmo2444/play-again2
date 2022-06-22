import { useEffect, useState } from "react"

export const Friends = ({currentUserId, otherUserId}) => {
    const [friendsLists, setFriendsList] = useState([])
    const [friendshipStatus, setFriendshipStatus] = useState(false)
    const [newFriendship, setNewFriendship] = useState({
        requesterId: 0,
        accepterId: 0,
        date: ""
    })

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
                if(friends.requesterId === currentUserId || friends.requesterId === otherUserId) {
                    if(friends.accepterId === currentUserId || friends.accepterId === otherUserId) {
                        setFriendshipStatus(true)
                    }
                }
            })
        },
        [friendsLists]
    )

    const add = () => {
        
    }

    const remove = () => {
        
    }

    return <>
    {friendshipStatus ? <>
        <div>Friends since: </div>
        <button>Remove Friend</button>
        </> : <button onClick={() => add()}>Add Friend</button>}
    </>
}