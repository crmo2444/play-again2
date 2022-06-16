import { Link } from "react-router-dom"
import { WishlistGameDelete } from "./WishlistGameDelete"

export const WishlistGame = ({gameObject, setterGames, setterWishlist}) => {

    return <section className="game">
        <div>{gameObject.gameName}</div>
        <Link to={`/game/${gameObject.gameId}`}>
        <img className="gameImage" src={gameObject.image}/>
        </Link>
        <div>On {gameObject.platformName}</div>
        <WishlistGameDelete id={gameObject.id} setEmpty={setterGames} setWishlist={setterWishlist} />
    </section> 
}