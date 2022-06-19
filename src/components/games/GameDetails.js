
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { keys } from "../../Settings"

export const GameDetails = () => {
    const {gameId} = useParams()
    const [games, setGames] = useState([])
    const [currentGame, setCurrent] = useState([])
    const [gamePlatforms, setPlatforms] = useState([])
    const [gameDescription, setDescription] = useState([])
    const [gameScreenshots, setScreenshots] = useState([])
    const [gameGenres, setGenres] = useState([])
    const [hasDetails, setHasDetails] = useState(true)

    useEffect(
        () => {
            fetch(`http://localhost:8089/games`)
            .then(response=>response.json())
            .then((data) => {
                setGames(data)
            })

            fetch(`http://localhost:8088/gameDetails?id=${gameId}`)
            .then(response=>response.json())
            .then((data) => {
                if(data.length !== 0) {
                    let singleGame = data[0]
                    setDescription(singleGame)
                }
                else {
                    setHasDetails(false)
                }
            })
        },
        []
    )

    useEffect(
        () => {
            
            games.map(game => {
                if(parseInt(game.id)===parseInt(gameId)) {
                    setCurrent(game)
                }
            })

        },
        [games]
    )

    useEffect(
        () => {
            if(currentGame) {
                setPlatforms(currentGame?.platforms)
                setScreenshots(currentGame?.short_screenshots)
                setGenres(currentGame?.genres)
            }
        },
        [currentGame]
    )

    return <>
    {hasDetails ? <>
        <h3 className="title">{currentGame.name}</h3>
        <div className="imageDetails" 
        /* onMouseOver={event => event.target.play()} 
        src={`${vid.videos.tiny.url}#t=1`} */><img className="game-details" src={currentGame.background_image}/></div>
        <div>Available on: </div>
        {gamePlatforms ? <>
        {gamePlatforms.map(gamePlatform => {
            return <div>{gamePlatform.platform.name}</div>
        })}
        </> : null}
        <br></br>
        <div>Genres: </div>
        {gameGenres ? <>
        {gameGenres.map(genre => {
            return <div>{genre.name}</div>
        })}
        </> : null}
        <br></br>
        <div className="description">{gameDescription.description}</div>
        <section className="screenshots">
            {gameScreenshots ? <>
                {gameScreenshots.map(screenshot => {
                    if(screenshot.id !== -1) {
                        return <img className="screenshot" src={screenshot.image}/>
                    }
            })}</> : null }
        </section>
        </> : <div>No details yet!</div>}
    </>
}