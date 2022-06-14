import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const Game = ({gameObject}) => {
    const [feedback, setFeedback] = useState("")

    let navigate = useNavigate()

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const addToLibrary = () => {
        const newGame = {
            userId: localUserObject.id,
            gameId: gameObject.id,
            library: true,
            wishlist: false
        }

    // TODO: Perform the fetch() to POST the object to the API
    fetch('http://localhost:8088/libraryAndWishlist', {
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

    const addToWishlist = () => {
        const newGame = {
            userId: localUserObject.id,
            gameId: gameObject.id,
            library: false,
            wishlist: true
        }

    // TODO: Perform the fetch() to POST the object to the API
    fetch('http://localhost:8088/libraryAndWishlist', {
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
                {/* <img className="resultPictures" src={result?.short_screenshots[0]?.image}/> */}
                <button onClick={() => navigate(`/game/${gameObject.id}`)}>Details</button>
                <button onClick={(event) => addToLibrary(event)}>Add to Library</button>
                <button onClick={(event) => addToWishlist(event)}>Add to Wishlist</button>
            </section>
}