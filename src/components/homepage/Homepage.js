import { useEffect, useState } from "react"
import 'react-slideshow-image/dist/styles.css'
import { HomepageFeatured } from "./HomepageFeatured"
import { HomepageActivity } from "./HomepageActivity"
import "./Homepage.css"
import { useNavigate } from "react-router-dom"
import { HomepageCurrentlyPlaying } from "./HomepageCurrentlyPlaying"

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
                    background: game.background,
                    name: game.name,
                    deck: game.deck,
                    trailer: game.trailer,
                    id: game.id
                })
            })

            setGameImages(allImages)
        },
        [featuredGames]
    )

    return <section className="homepage">
        <section className="header">
        <h1 className="logo" onClick={() => navigate("/")}>Play Again</h1>
        <h1 className="headerTitle">Featured Games</h1>
        </section>
        <HomepageFeatured gameImages={gameImages}/>
        <section className="bottomHalf">
            <HomepageActivity />
            <HomepageCurrentlyPlaying/>
        </section>
        </section>


}