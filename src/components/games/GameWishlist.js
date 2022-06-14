
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const GameWishlist = () => {
    const [games, setGames] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [hasGames, setHasGames] = useState(false)
    const [currentUserWishlist, setCurrentUserWishlist] = useState([])
    const [filteredGames, setFiltered] = useState([])

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/games`)
                .then(response=>response.json())
                .then((data) => {
                    let dataArray = data[0].results
                    setGames(dataArray)
                })

            fetch(`http://localhost:8088/users?id=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    let singleUser = data[0]
                    setCurrentUser(singleUser)
                })

            fetch(`http://localhost:8088/libraryAndWishlist?wishlist=true&userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setCurrentUserWishlist(data)
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
                currentUserWishlist.map(currentGame => {
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
    <h2>{currentUser.firstName}'s Wishlist</h2>
    <section className="gameWishlist">
        {hasGames === true ? <>
        {filteredGames.map(game => {
            return <section className="game">
                <div>{game.name}</div>
                <Link to={`/game/${game.id}`}>
                <img className="gameImage" src={game.background_image}/>
                </Link>
                </section>
        })}
        </> : <div>No games in wishlist.</div>}
    </section>
    </>
}