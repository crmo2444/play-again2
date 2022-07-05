import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AddWishlistToLibrary } from "./AddWishlistToLibrary"
import { WishlistGameDelete } from "./WishlistGameDelete"

export const WishlistGame = ({game, setterGames, setterWishlist}) => {
    const [foundPlatform, setFoundPlatform] = useState({})

    useEffect(
        () => {
            game?.gameObject?.platforms.map(platform => {
                if(platform.id === game.platform) {
                    setFoundPlatform(platform)
                }
            })
        },
        []
    )

    return <section className="games">
        <Link to={`/game/${game?.gameObject?.id}`}>
        <img className="gameImage" src={game?.gameObject?.image?.original_url}/>
        </Link>
        <div>{foundPlatform.name}</div>
        <div className="wishlistDelete">
            <WishlistGameDelete id={game.id} setEmpty={setterGames} setWishlist={setterWishlist} />
        </div>
        <div className="wishlistAdd">
            <AddWishlistToLibrary id={game.id} 
            setEmpty={setterGames} 
            setWishlist={setterWishlist} 
            platform={foundPlatform.id} 
            gameObj={game}/>
        </div>
    </section> 
}