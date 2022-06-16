
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LibraryGame } from "./LibraryGame"

export const GameLibrary = () => {
    const [games, setGames] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [hasGames, setHasGames] = useState(false)
    const [currentUserLibrary, setCurrentUserLibrary] = useState([])
    const [filteredGames, setFiltered] = useState([])

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8089/games`)
                .then(response=>response.json())
                .then((data) => {
                    setGames(data)
                })

            fetch(`http://localhost:8088/users?id=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setCurrentUser(singleUser)
                })

            fetch(`http://localhost:8088/libraryGames?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setCurrentUserLibrary(data)
                        setHasGames(true)
                    }
                })
 
        },
        []
    )

    let filtered = []
    
    useEffect(
        () => {

            if(hasGames === true) {
                currentUserLibrary.map(currentGame => {
                    games.map(game => {
                        if(game.id === currentGame.gameId) {
                            filtered.push(game)
                        }
                    })
                })
            }
                setFiltered(filtered)
        },
        [games]
    )

    return <>
    <h2>{currentUser.firstName}'s Game Library</h2>
    <section className="gameLibrary">
        {hasGames === true ? <>
        {currentUserLibrary.map(game => {
            return <LibraryGame key={`game--${game.id}`} 
            gameObject={game} 
            setterGames={setHasGames} 
            setterLibrary = {setCurrentUserLibrary} /> })}
        </> : <div>No games in library.</div>}
    </section>
    </>
}