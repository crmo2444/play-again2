import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { addToGameLibrary, addToGameWishlist, setLibraryGames, setWishlistGames } from "../../FetchRequests";

export const Game = ({gameObject}) => {
    const [feedback, setFeedback] = useState("")
    const [library, setLibrary] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [chosenConsole, setChosen] = useState("")
    const [wishlist, setWishlist] = useState([])
    const [yearFormat, setYearFormat] = useState("")

    let navigate = useNavigate()

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            setLibraryGames(setLibrary)
            setWishlistGames(setWishlist)
            setPlatforms(gameObject?.platforms)
        },
        []
    )

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const checkLibrary = () => {
        let foundGame = false

        library.map(game => {
            if (game?.gameObject?.id === gameObject.id && game.platform === chosenConsole && game.userId === localUserObject.id) {
                foundGame = true
            }
        })


        let foundPlatform = platforms.find(platform => platform.id === chosenConsole)

        if (foundGame) {
            return window.alert(`${gameObject.name} on ${foundPlatform.name} already in library.`)
        }
        else if (chosenConsole === "") {
            return window.alert(`Please choose a platform.`)
        }
        else {
            addToLibrary(foundPlatform)
        }
        
    }

    const addToLibrary = (platform) => {

        const d = new Date();
        let date = d.toISOString()

        console.log(platform)
        const newGame = {
            userId: localUserObject.id,
            gameObject: gameObject,
            platform: chosenConsole,
            date: date
        }
    
        // TODO: Perform the fetch() to POST the object to the API
        addToGameLibrary(newGame, setFeedback)
    }

    const checkWishlist = () => {

        let foundGame = false

        wishlist.map(game => {
            if (game.gameId === gameObject.id && game.platform === chosenConsole && game.userId === localUserObject.id) {
                foundGame = true
            }
        })

        let foundPlatform = platforms.find(platform => platform.id === chosenConsole)

        if (foundGame) {
            return window.alert(`${gameObject.name} on ${foundPlatform.name} already in wishlist!`)
        }
        else if (chosenConsole === "") {
            return window.alert(`Please choose a platform.`)
        }
        else {
            addToWishlist(foundPlatform)
        }
    }

    const addToWishlist = (platform) => {

        const d = new Date();
        let date = d.toISOString()

        console.log(platform)
        const newGame = {
            userId: localUserObject.id,
            gameObject: gameObject,
            platform: chosenConsole,
            date: date
        }

    // TODO: Perform the fetch() to POST the object to the API
        addToGameWishlist(newGame, setFeedback)
    }

    return <section className="game">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
                <section>
                    <img className="coverPhoto" src={gameObject?.image?.original_url}/>
                </section>

                <div className="titleDetails">
                    <div className="gameTitle">
                        <Link to={`/game/${gameObject.id}`}> {gameObject.name}</Link>
                    </div>
                    <div className="gameReleaseDate">{gameObject?.original_release_date}</div>
                    <div className="gameDescription">
                        <div>{gameObject.deck}</div>
                    </div>
                    <div className="dropdownButtons">
                        <select className="platforms" onChange={(event) => {
                            let chosenPlatform = event.target.value
                            setChosen(parseInt(chosenPlatform))
                        }}>
                            <option value="0">Platforms...</option>
                            {gameObject.platforms.map(platform => {
                                return <option value={`${platform.id}`}>{platform.name}</option>
                            })}
                        </select>
                        {/* <img className="resultPictures" src={result?.short_screenshots[0]?.image}/> */}
                        <button onClick={(event) => checkLibrary(event)}>Add to Library</button>
                        <button onClick={(event) => checkWishlist(event)}>Add to Wishlist</button>
                    </div>
                </div>
            </section>
}