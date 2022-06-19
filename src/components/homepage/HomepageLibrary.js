import { useEffect, useState } from "react"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

export const HomepageLibrary = () => {
    const [userLibrary, setUserLibraryGames] = useState([])
    const [gameImages, setGameImages] = useState([])

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/libraryGames?userId=${localUserObject.id}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setUserLibraryGames(data)
                    }
                })
        },
        []
    )

    useEffect(
        () => {
            let images = []

            userLibrary.map(game => {
                let object = {
                    image: game.image,
                    name: game.gameName
                }
                images.push(object)
            })

            setGameImages(images)
        },
        [userLibrary]
    )

    const style = {
        textAlign: 'center',
        fontSize: '30px',
        width: '10rem',
        height: '20rem',
      };
      
    const text = {
        position: 'absolute',
        bottom: '8px',
        left: '16px',
        color: 'red'
    }
      const properties = {
        duration: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        indicators: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ],
      };
    
      return (
        <div>
          <div>
            <Slide {...properties}>
                {gameImages.map(image => {
                    return <>
                    <div style={style}><img width="500" height="400" src={`${image.image}`}/></div>
                    <div style={text}>{image.name}</div>
                    </>
                })}
            </Slide>
          </div>
        </div>
      )
}