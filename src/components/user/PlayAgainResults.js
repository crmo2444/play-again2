import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { keys } from "../../Settings"

export const PlayAgainResults = ({id}) => {
    const [gameDetails, setGameDetails] = useState([])
    
    useEffect(
        () => {
            fetch(`/game/3030-${id}/?api_key=${keys.giantBombKey}&format=json`)
                .then(response=>response.json())
                .then((data) => {
                    let results = data.results
                    setGameDetails(results)
                })
        },
        []
    )

    return <section className="result">
        <Link to={`/game/${id}`}>
            <img className="gameImage" src={gameDetails?.image?.original_url} title={`${gameDetails.name}`} alt={`${gameDetails.name}`} />
        </Link>
    </section>
}