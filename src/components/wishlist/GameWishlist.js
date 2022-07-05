
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { WishlistGame } from "./WishlistGame"
import "./Wishlist.css"

export const GameWishlist = () => {
    const [currentUser, setCurrentUser] = useState([])
    const [hasGames, setHasGames] = useState(false)
    const [currentUserWishlist, setCurrentUserWishlist] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [chosenPlatform, setChosen] = useState(0)
    const [filteredGames, setFiltered] = useState([])

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    let navigate = useNavigate()

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

    useEffect(
        () => {
            let foundPlatforms = []

            currentUserWishlist.map(game => {
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
            setFiltered(currentUserWishlist)
        },
        [currentUserWishlist]
    )

    useEffect(
        () => {
            let filtered = []

            if(chosenPlatform === 0) {
                setFiltered(currentUserWishlist)
            }
            else {
                filtered = currentUserWishlist.filter(game => game.platform === chosenPlatform)
                setFiltered(filtered)
            }
        },
        [chosenPlatform]
    )
    


    let count = 0;

    return <>
    <section className="header">
            <h1 className="logo" onClick={() => navigate("/")}>Play Again</h1>
            <h1 className="headerTitle">{currentUser.firstName}'s Wishlist</h1>
        </section>
        <select className="gameFilter" onChange={(event) => {
                            let chosenPlatform = event.target.value
                            setChosen(parseInt(chosenPlatform))
                        }}>
        <option value="0">Filter by...</option>
        {platforms.map(platform => {
            count++
            return <option value={`${platform.id}`}>{platform.name}</option>
        })}
    </select>
    <section className="gameWishlist">
        {hasGames === true ? <>
        {filteredGames.map(game => {
               return <WishlistGame key={`game--${game.id}`}
               game={game} 
               setterGames={setHasGames}
               setterWishlist={setCurrentUserWishlist}/> })}
        </> : <div>No games in wishlist.</div>}
    </section>
    </>
}