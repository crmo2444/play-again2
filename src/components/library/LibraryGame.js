import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LibraryGameDelete } from "./LibraryGameDelete"

export const LibraryGame = ({game, setterGames, setterLibrary}) => {
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

    return <section className="game">
        <div>{game?.gameObject?.name}</div>
        <Link to={`/game/${game?.gameObject?.id}`}>
        <img className="gameImage" src={game?.gameObject?.image?.original_url}/>
        </Link>
        <div>On {foundPlatform.name}</div>
        <LibraryGameDelete id={game.id} setEmpty={setterGames} setLibrary={setterLibrary} />
    </section> 
}