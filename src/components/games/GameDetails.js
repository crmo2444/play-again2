
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { setAllGameReviews } from "../../FetchRequests"
import { keys } from "../../Settings"
import { AddGameReview } from "../reviews/AddGameReview"
import { DeleteGameReview } from "../reviews/DeleteGameReview"
import { EditGameReview } from "../reviews/EditGameReview"
import ImageGallery from 'react-image-gallery';
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoMdHeart } from 'react-icons/io'
import { IconContext } from "react-icons";
import { BiLibrary } from 'react-icons/bi'

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
    const [chosenPlatform, setChosen] = useState(0)
    const [chosenState, setChosenState] = useState(false)
    const [hasLibrary, setHasLibrary] = useState(false)
    const [hasWishlist, setHasWishlist] = useState(false)
    const [wishlistId, setWishlistId] = useState(0)
    const [libraryId, setLibraryId] = useState(0)
    const [description, setDescription] = useState("")
    const [formattedDescription, setFormatted] = useState("")

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
            if(typeof currentGame.description !== 'undefined'){
                let description = currentGame.description
                setDescription(description)
            }

            else {
                setFormatted(currentGame.deck)
            }
        },
        [currentGame]
    )

    useEffect(
        () => {
            if(typeof description !== 'undefined') {
                let format = description.replace(/(<([^>]+)>)/gi, "")
                let minusOverview = format.slice(8)
                setFormatted(minusOverview)
            }
        },
        [description]
    )

   /*  useEffect(
        () => {
            let foundVideo 

            if (videos.length !== 0) {
                foundVideo = videos.find(video => video.name.includes('Trailer') || video.name.includes('trailer'))

                if (foundVideo) {
                    setTrailer(foundVideo)
                }
                else {
                    setTrailer(videos[0])
                }
            }

        },
        [videos]
    )

    useEffect(
        () => {
            trailerVid()
        },
        [trailer]
    ) */

    useEffect(
        () => {
            if (chosenPlatform !== 0) {
                setChosenState(true)
            }

            fetch(`http://localhost:8088/libraryGames?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        data.map(game => {
                            if(game?.gameObject?.id === parseInt(gameId) && game.platform === chosenPlatform) {
                                setHasLibrary(true)
                            }
                            
                        })
                    }
                })

            fetch(`http://localhost:8088/wishlistGames?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        data.map(game => {
                            if(game?.gameObject?.id === parseInt(gameId) && game.platform === chosenPlatform) {
                                setHasWishlist(true)
                            }
                            else {
                                setHasWishlist(false)
                            }
                        })
                    }
                })
        },
        [chosenPlatform]
    )

    /* const trailerVid = () => {
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
    } */

    const currentUserReviews = (review) => {
        if(localUserObject.id === review.userId) {
            return <>
            <EditGameReview reviewObject={review} game={parseInt(gameId)} setter={setGameReviews} user={localUserObject.id} gameName={currentGame?.name}/>
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

    const addToLibrary = () => {

        const d = new Date();
        let date = d.toISOString()

        const newGame = {
            userId: localUserObject.id,
            gameObject: currentGame,
            platform: chosenPlatform,
            date: date
        }
    
        // TODO: Perform the fetch() to POST the object to the API
        fetch('http://localhost:8088/libraryGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(
            () => {
                fetch(`http://localhost:8088/libraryGames`)
                .then(response => response.json())
                .then((data) => {
                    let lastGame = data.slice(-1)
                    setLibraryId(lastGame[0].id)
                })
            }
        )

        if(hasWishlist === true) {
            handleDeleteWishlistGame()
            setHasWishlist(false)
        }
    }

    const addToWishlist = () => {

        const d = new Date();
        let date = d.toISOString()

        const newGame = {
            userId: localUserObject.id,
            gameObject: currentGame,
            platform: chosenPlatform,
            date: date
        }
    
        // TODO: Perform the fetch() to POST the object to the API
        fetch('http://localhost:8088/wishlistGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(
            () => {
                fetch(`http://localhost:8088/wishlistGames`)
                .then(response => response.json())
                .then((data) => {
                    let lastGame = data.slice(-1)
                    setWishlistId(lastGame[0].id)
                })
            }
        )
    }
    
    const handleDeleteWishlistGame = () => {
        return fetch(`http://localhost:8088/wishlistGames/${wishlistId}`, { method: "DELETE" })
                    .then(response => response.json())
    } 

    const handleDeleteLibraryGame = () => {
        return fetch(`http://localhost:8088/libraryGames/${libraryId}`, { method: "DELETE" })
                    .then(response => response.json())
    } 

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
                    <div className="description">{formattedDescription}</div>
            </section>
                <div className="photoGallery"><ImageGallery items={images} /></div>
        </section>
        {/* trailer ? <>{trailerVid()}</> : null} */}
        <section className="platformBuyNow">
        <section className="dropdowns">
        <div>Available on: </div>
        <select className="platformDropdown" onChange={(event) => {
                            let chosenPlatform = event.target.value
                            setChosen(parseInt(chosenPlatform))
                            setHasLibrary(false)
                            setHasWishlist(false)
                        }}>
        <option value="0">Filter by...</option>
        {gamePlatforms.map(platform => {
            count++
            return <option value={`${platform.id}`}>{platform.name}</option>
        })}
        </select>
        {chosenState ? 
            <section className="wishlistLibButtons">
                {hasLibrary ? <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "30"}}>
                                    <BiLibrary title="Remove from Library"
                                    onClick={() => {setHasLibrary(false)
                                    setHasWishlist(false)
                                    handleDeleteLibraryGame()}}/>
                              </IconContext.Provider> : <>
                              {hasWishlist ? <><IconContext.Provider value={{ color: "black", className: "global-class-name", size: "30"}}>
                                      <BiLibrary title="Add to Library"
                                      onClick={() => {setHasLibrary(true)
                                        addToLibrary()}}/>
                                </IconContext.Provider> 
                                <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "30"}}>
                                  <IoMdHeart title="Remove from Wishlist"
                                  onClick={() => {setHasWishlist(false)
                                  handleDeleteWishlistGame()}}/>
                              </IconContext.Provider></> :  <>
                                <IconContext.Provider value={{ color: "black", className: "global-class-name", size: "30"}}>
                                      <BiLibrary title="Add to Library"
                                      onClick={() => {setHasLibrary(true)
                                      addToLibrary()}}/>
                                </IconContext.Provider> 
                                <IconContext.Provider value={{ color: "black", className: "global-class-name", size: "30"}}>
                                  <IoMdHeartEmpty title="Add to Wishlist"
                                  onClick={() => {setHasWishlist(true)
                                  addToWishlist()}}/>
                              </IconContext.Provider>
                              </>}
                              </>}
            </section> : null}
        </section>
        <section className="buyNowButtons">
        <a href={`https://www.amazon.com/s?k=${formattedName}+game&crid=GUOR689WXLXW&sprefix=${formattedName}+game%2Caps%2C179&ref=nb_sb_noss_1`}  target="_blank">
            <img className="buyNow" src="https://freestyleconnection.com/wp-content/uploads/2018/01/button-buy-amazon-01.png"/>
        </a>
        <a href={`https://www.gamestop.com/search/?q=${formattedName}&lang=default`} target="_blank">
            <img className="buy-Now" src="https://logos-world.net/wp-content/uploads/2021/02/GameStop-Logo-2000-present.jpg"/>
        </a>
        </section>
        </section>
        {noReviews ? <>
        <h3 className="reviewTitle">All Reviews</h3>
        <div className="reviewTitle">No reviews yet!</div> 
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