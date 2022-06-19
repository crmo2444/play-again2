
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { WishlistGame } from "./WishlistGame"
import "./Wishlist.css"

export const GameWishlist = () => {
    const [currentUser, setCurrentUser] = useState([])
    const [hasGames, setHasGames] = useState(false)
    const [currentUserWishlist, setCurrentUserWishlist] = useState([])

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

    return <>
    <h2>{currentUser.firstName}'s Wishlist</h2>
    <section className="gameWishlist">
        {hasGames === true ? <>
        {currentUserWishlist.map(game => {
               return <WishlistGame key={`game--${game.id}`}
               game={game} 
               setterGames={setHasGames}
               setterWishlist={setCurrentUserWishlist}/> })}
        </> : <div>No games in wishlist.</div>}
    </section>
    </>
}