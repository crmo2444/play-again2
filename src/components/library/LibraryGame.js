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

    return <section className="games">
        <Link to={`/game/${game?.gameObject?.id}`}>
        <img className="libraryGameImage" src={game?.gameObject?.image?.original_url} alt={game?.gameObject?.name} title={game?.gameObject?.name}/>
        </Link>
        <div className="overlay"></div>
        <div className="pageButtons">
            <LibraryGameDelete id={game.id} setEmpty={setterGames} setLibrary={setterLibrary} />
        </div>
        <div>{foundPlatform.name}</div>
        {/* <LibraryGameDelete id={game.id} setEmpty={setterGames} setLibrary={setterLibrary} /> */}
        {/* <button className="pageButton" onClick={() => navigate(`/game/${game?.gameObject?.id}`)}>Details</button> */}
    </section> 
}