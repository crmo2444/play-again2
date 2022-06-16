import { useEffect, useState } from "react"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'
import { HomepageLibrary } from "./HomepageLibrary"

export const Homepage = () => {
    const [allGames, setAllGames] = useState([])
    const [gameImages, setGameImages] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8089/games`)
                .then(response=>response.json())
                .then((data) => {
                    setAllGames(data)
                })
        },
        []
    )

    useEffect(
        () => {
            let allImages = []

            allGames.map(game => {
                allImages.push(game.background_image)
            })

            setGameImages(allImages)
        },
        [allGames]
    )

    return <HomepageLibrary />

}