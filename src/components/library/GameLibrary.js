
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LibraryGame } from "./LibraryGame"
import "./Library.css"
import { keys } from "../../Settings"

export const GameLibrary = () => {
    const [currentUser, setCurrentUser] = useState([])
    const [hasGames, setHasGames] = useState(false)
    const [currentUserLibrary, setCurrentUserLibrary] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [chosenPlatform, setChosen] = useState(0)
    const [filteredGames, setFiltered] = useState([])

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
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

    useEffect(
        () => {
            let foundPlatforms = []

            currentUserLibrary.map(game => {
                let platforms = game?.gameObject?.platforms

                platforms.map(platform => {
                    if(platform.id === game.platform) {
                        let object = {
                            name: platform.name,
                            id: platform.id
                        }

                        if((foundPlatforms.some(platform => platform.id === object.id)) === false) {
                            foundPlatforms.push(object)
                        }
                    }
                })
            })

            setPlatforms(foundPlatforms)
        },
        [currentUserLibrary]
    )

    useEffect(
        () => {
            let filtered = []

            if(chosenPlatform === 0) {
                setFiltered(currentUserLibrary)
            }
            else {
                filtered = currentUserLibrary.filter(game => game.platform === chosenPlatform)
                setFiltered(filtered)
            }
        },
        [chosenPlatform]
    )

    let count = 0

    return <>
    <h2>{currentUser.firstName}'s Game Library</h2>
    <select onChange={(event) => {
                            let chosenPlatform = event.target.value
                            setChosen(parseInt(chosenPlatform))
                        }}>
        <option value="0">Filter by...</option>
        {platforms.map(platform => {
            count++
            return <option value={`${platform.id}`}>{platform.name}</option>
        })}
    </select>
    <section className="gameLibrary">
        {hasGames === true ? <>
        {filteredGames.map(game => {
            return <LibraryGame key={`game--${game.id}`} 
            game={game} 
            setterGames={setHasGames} 
            setterLibrary = {setCurrentUserLibrary} /> })}
        </> : <div>No games in library.</div>}
    </section>
    </>
}