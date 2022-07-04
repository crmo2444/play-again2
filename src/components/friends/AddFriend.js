import { useState } from "react"

export const AddFriend = ({notification, accepterId, requesterId, setNotif}) => {
    const d = new Date();
    let date = d.toISOString()

    let newFriend = {
        requesterId: requesterId,
        accepterId: accepterId,
        date: date
    }

    console.log(newFriend)

    return fetch('http://localhost:8088/friendsList', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newFriend)
                })
                    .then(response => response.json())
                    .then(() => {
                        fetch(`http://localhost:8088/notifications/${notification}`, { method: "DELETE" })
                        .then(response => response.json())
                        .then((data) => {
                            setNotif(data)
                        })
                    })


}