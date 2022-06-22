import { useState } from "react"

export const AddFriend = ({accept}) => {
    const [newFriendship, setNewFriendship] = useState({
        requesterId: 0,
        accepterId: 0,
        date: ""
    })
}