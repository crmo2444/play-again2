import { Link } from "react-router-dom"
import { LibraryGameDelete } from "./LibraryGameDelete"

export const LibraryGame = ({gameObject, setterGames, setterLibrary}) => {

    return <section className="game">
        <div>{gameObject.gameName}</div>
        <Link to={`/game/${gameObject.gameId}`}>
        <img className="gameImage" src={gameObject.image}/>
        </Link>
        <div>On {gameObject.platformName}</div>
        <LibraryGameDelete id={gameObject.id} setEmpty={setterGames} setLibrary={setterLibrary} />
    </section> 
}