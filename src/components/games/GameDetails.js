
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { keys } from "../../Settings"

export const GameDetails = () => {
    const {gameId} = useParams()
    const [currentGame, setCurrent] = useState([])
    const [videos, setVideos] = useState([])
    const [trailer, setTrailer] = useState([])
    const [trailerURL, setTrailerURL] = useState([])
    const [formattedName, setFormattedName] = useState("")
    const [backgroundPic, setBackgroundPic] = useState("")
    const [genres, setGenres] = useState([])
    const [themes, setThemes] = useState([])
    const [gamePlatforms, setGamePlatforms] = useState([])
    const [screenshots, setScreenshots] = useState([])

    useEffect(
        () => {

            fetch(`/game/3030-${gameId}/?api_key=${keys.giantBombKey}&format=json`)
                .then(response=>response.json())
                .then((data) => {
                    let details = data.results
                    setCurrent(details)
                    setVideos(details.videos)
                    setFormattedName(details.name.replace(/ /g,"+"))
                    setGenres(details.genres)
                    setGamePlatforms(details.platforms)
                    setThemes(details.themes)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`https://api.rawg.io/api/games?key=${keys.RAWG}&search=${formattedName}`)
            .then(response=>response.json())
                .then((data) => {
                    let details = data?.results[0]?.background_image
                    let screenshotsArray = data?.results[0]?.short_screenshots
                    setBackgroundPic(details)
                    setScreenshots(screenshotsArray)
                })
        },
        [formattedName]
    )

    useEffect(
        () => {
            let foundVideo 

            if (videos.length !== 0) {
                foundVideo = videos.find(video => video.name.includes('Trailer') || video.name.includes('trailer'))
            }

            setTrailer(foundVideo)
        },
        [videos]
    )

    const trailerVid = () => {
        if(typeof trailer !== 'undefined') {
            let string = trailer.api_detail_url
            let split = string.split("i/")
            let secondHalf = split[1]

            fetch(`/${secondHalf}?api_key=${keys.giantBombKey}&format=json`)
                .then(response=>response.json())
                .then((data) => {
                    setTrailerURL(data)
                })
        }

        else {
            console.log('hi')
        }
    }

    let count = 0

    return <>
         <h3 className="title">{currentGame.name}</h3>
         <div className="date">Release Date: {currentGame.original_release_date}</div>
        <div className="imageDetails">
        <img className="gamePhoto" src={backgroundPic}/></div>
        {/* trailer ? <>{trailerVid()}</> : null} */}
        <div>Available on: </div>
        {gamePlatforms.map(platform => {
            return <div>{platform.name}</div>
        })}
        <br></br>
        <div>Genres: </div>
        {genres.map(genre => {
            return <div>{genre.name}</div>
        })}
        <br></br>
        <div>Themes:</div>
        {themes.map(theme => {
            return <div>{theme.name}</div>
        })}
        <div className="description">{currentGame.deck}</div>
        <section className="screenshots">
            {screenshots.map(screenshot => {
                if(count === 0) {
                    count++
                }
                else{
                    count++
                    return <img className="screenshot" src={screenshot.image}/>
                }
            })}
        </section>
        </>
}