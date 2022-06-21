import { useEffect, useState } from "react"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'
import { HomepageFeatured } from "./HomepageFeatured"
import { HomepageLibrary } from "./HomepageLibrary"
import "./Homepage.css"
import { useNavigate } from "react-router-dom"

export const Homepage = () => {
    const [featuredGames, setFeatured] = useState([])
    const [gameImages, setGameImages] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/featuredGames`)
                .then(response=>response.json())
                .then((data) => {
                    setFeatured(data)
                })
        },
        []
    )

    useEffect(
        () => {
            let allImages = []

            featuredGames.map(game => {
                allImages.push({
                    image: game?.image?.original_url,
                    id: game.id
                })
            })

            setGameImages(allImages)
        },
        [featuredGames]
    )

    return <section className="homepage">
        <HomepageFeatured gameImages={gameImages}/>
        <button className="playAgain" onClick={() => navigate("/play-again")}>Ready to Play Again?</button>
        </section>

}