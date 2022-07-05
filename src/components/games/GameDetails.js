
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { setAllGameReviews } from "../../FetchRequests"
import { keys } from "../../Settings"
import { AddGameReview } from "../reviews/AddGameReview"
import { DeleteGameReview } from "../reviews/DeleteGameReview"
import { EditGameReview } from "../reviews/EditGameReview"
import ImageGallery from 'react-image-gallery';

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
    const [gameReviews, setGameReviews] = useState([])
    const [noReviews, setNoReviews] = useState(false)

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    let navigate = useNavigate()

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

            setAllGameReviews(gameId, setNoReviews, setGameReviews)
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

    const currentUserReviews = (review) => {
        if(localUserObject.id === review.userId) {
            return <>
            <EditGameReview reviewObject={review} game={parseInt(gameId)} setter={setGameReviews} user={localUserObject.id}/>
            <DeleteGameReview id={review.id} game={parseInt(gameId)} setter={setGameReviews}/>
            </>
        }
    }

    let count = 0

    const images = []

    screenshots.map(screenshot => {
        if (count === 0) {
            count++
        }

        else if (count !== 0) {
            let x = {
                original: `${screenshot.image}`,
                thumbnail: `${screenshot.image}`
            }
    
            images.push(x)
        }
    })  

    return <>
    <section className="header">
            <h1 className="logo" onClick={() => navigate("/")}>Play Again</h1>
        </section>
        <section className="topHalf">
            <section className="allDetails">
                <h3 className="title">{currentGame.name}</h3>
                <div className="date">Release Date: {currentGame.original_release_date}</div>
                    {genres.map(genre => {
                        return <div className="genre">{genre.name}</div>
                    })}
                    {themes.map(theme => {
                        return <div className="theme">{theme.name}</div>
                    })}
                    <div className="description">{currentGame.deck}</div>
            </section>
                <div className="photoGallery"><ImageGallery items={images} /></div>
        </section>
        {/* trailer ? <>{trailerVid()}</> : null} */}
        <div>Available on: </div>
        <section className="platformsList">
        {gamePlatforms.map(platform => {
            return <div>{platform.name}</div>
        })}
        </section>
        <br></br>
        {noReviews ? <>
        <h3>All Reviews</h3>
        <div>No reviews yet!</div> 
        <br></br>
        <AddGameReview user={localUserObject.id} 
        game={parseInt(gameId)} 
        gameName={currentGame.name}
        setter={setGameReviews} 
        setNoReviews={setNoReviews}/>
        </> : <>
        <section className="reviews">
            <h3 className="reviewTitle">All Reviews</h3>
            {gameReviews.map(review => {
                return <section className="review">
                            <div className="reviewLeft"><img className="profilePic" src={review?.user?.profilePicture} /></div>
                            <div className="reviewRight">
                                <div>{review.review}</div>
                                <br></br>
                                <div>{review.rating}</div>
                                <div className="reviewName">Review by {review?.user?.firstName} {review?.user?.lastName}</div>
                                {currentUserReviews(review)}
                            </div>
                    </section>
            })}
        </section>
            <AddGameReview
            user={localUserObject.id} 
            game={parseInt(gameId)} 
            setter={setGameReviews} 
            setNoReviews={setNoReviews}
            gameName={currentGame.name}/>
        <br></br>
        </>}
        </>
}