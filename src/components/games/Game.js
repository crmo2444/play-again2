import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const Game = ({gameObject}) => {
    const [feedback, setFeedback] = useState("")
    const [library, setLibrary] = useState([])
    const [consoles, setConsoles] = useState([])
    const [chosenConsole, setChosen] = useState("")
    const [platformDetails, setPlatformDetails] = useState([])

    let navigate = useNavigate()

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/libraryGames`)
                .then(response=>response.json())
                .then((data) => {
                    setLibrary(data)
                })

            fetch(`http://localhost:8089/consoles`)
                .then(response=>response.json())
                .then((data) => {
                    setPlatformDetails(data)
                })

            setConsoles(gameObject?.platforms)
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
            if (game.gameId === gameObject.id && game.library === true && game.platformId === chosenConsole) {
                foundGame = true
            }
        })

        let foundPlatform = platformDetails.find(platform => platform.id === chosenConsole)

        if (foundGame) {
            return window.alert(`${gameObject.name} on ${foundPlatform.name} already in library.`)
        }
        else if (chosenConsole === "") {
            return window.alert(`Please choose a platform.`)
        }
        else {
            addToLibrary()
        }
        
    }

    const addToLibrary = () => {
        
        let foundPlatform = platformDetails.find(platform => platform.id === chosenConsole)

            const newGame = {
                userId: localUserObject.id,
                gameId: gameObject.id,
                platform: chosenConsole,
                image: gameObject.background_image,
                platformName: foundPlatform.name,
                gameName: gameObject.name
            }
    
        // TODO: Perform the fetch() to POST the object to the API
        fetch('http://localhost:8088/libraryGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Added to Library!")
            })
    }

    const checkWishlist = () => {

        let foundGame = library.find(game => game.gameId === gameObject.id && game.wishlist === true)

        if (foundGame) {
            return window.alert(`${gameObject.name} already in wishlist!`)
        }
        else if (chosenConsole === "") {
            return window.alert(`Please choose a platform.`)
        }
        else {
            addToWishlist()
        }
    }

    const addToWishlist = () => {
        let foundPlatform = platformDetails.find(platform => platform.id === chosenConsole)
        console.log(foundPlatform)
        const newGame = {
            userId: localUserObject.id,
            gameId: gameObject.id,
            platform: chosenConsole,
            image: gameObject.background_image,
            platformName: foundPlatform.name,
            gameName: gameObject.name
        }

    // TODO: Perform the fetch() to POST the object to the API
    fetch('http://localhost:8088/wishlistGames', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGame)
    })
        .then(response => response.json())
        .then(() => {
            setFeedback("Added to Wishlist!")
        })
    }

    return <section className="game">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
                <h4>{gameObject.name}</h4>
                <select className="platforms" onChange={(event) => {
                    let chosenPlatform = event.target.value
                    setChosen(parseInt(chosenPlatform))
                }}>
                    <option value="0">Choose a Platform...</option>
                    {consoles.map(console => {
                        return <option value={`${console?.platform?.id}`}>{console?.platform?.name}</option>
                    })}
                </select>
                {/* <img className="resultPictures" src={result?.short_screenshots[0]?.image}/> */}
                <button onClick={() => navigate(`/game/${gameObject.id}`)}>Details</button>
                <button onClick={(event) => checkLibrary(event)}>Add to Library</button>
                <button onClick={(event) => checkWishlist(event)}>Add to Wishlist</button>
            </section>
}