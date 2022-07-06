import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { keys } from "../../Settings"

export const HomepageCurrentlyPlaying = () => {
    const [allUsers, setAllUsers] = useState([])
    const [hasUsers, setHasUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response=>response.json())
                .then((data) => {
                    setAllUsers(data)
                    setHasUsers(true)
                })
        },
        []
    )

       return <>
       {hasUsers ? 
            <section className="currentlyPlayingGames">
            <div className="nowPlayingTitle">Users Now Playing</div>
                {allUsers.map(user => {
                    return <section className="gameNow">
                        <Link to={`/game/${user.currentlyPlaying}`}>
                            <img src={user.gameURL}/>
                        </Link>
                    </section>
                })} 
            </section>: <div>Nothing</div>}
    </>
}