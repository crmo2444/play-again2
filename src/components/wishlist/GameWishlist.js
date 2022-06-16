
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { WishlistGame } from "./WishlistGame"

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

            fetch(`http://localhost:8088/wishlistGames?userId=${localUserObject.id}`)
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
        {currentUserWishlist.map(game => {
               return <WishlistGame key={`game--${game.id}`}
               gameObject={game} 
               setterGames={setHasGames}
               setterWishlist={setCurrentUserWishlist}/> })}
        </> : <div>No games in wishlist.</div>}
    </section>
    </>
}