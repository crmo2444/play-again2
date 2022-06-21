import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LibraryGameDelete } from "./LibraryGameDelete"

export const LibraryGame = ({game, setterGames, setterLibrary}) => {
    const [foundPlatform, setFoundPlatform] = useState({})

    let navigate = useNavigate()

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
        <Link to={`/game/${game?.gameObject?.id}`}>
        <img className="gameImage" src={game?.gameObject?.image?.original_url} alt={game?.gameObject?.name} title={game?.gameObject?.name}/>
        </Link>
        <div>On {foundPlatform.name}</div>
        <LibraryGameDelete id={game.id} setEmpty={setterGames} setLibrary={setterLibrary} />
        <button className="pageButton" onClick={() => navigate(`/game/${game?.gameObject?.id}`)}>Game Page</button>
    </section> 
}