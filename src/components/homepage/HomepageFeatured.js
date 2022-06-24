import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

export const HomepageFeatured = ({gameImages}) => {

    const [BgImg, setBgImg] = useState("https://s1.gaming-cdn.com/images/products/6147/orig/assassin-s-creed-valhalla-pc-game-ubisoft-connect-europe-cover.jpg?v=1650550345")
    const [title, setTitle] = useState("Assassin's Creed Valhalla")
    const [deck, setDeck] = useState("Assassin's Creed Valhalla is an entry in Ubisoft's long-running franchise, continuing the more RPG-focused formula of its predecessors and setting the story during the Viking Age.")
    const [gameId, setGameId] = useState(78229)
    const [trailer, setGameTrailer] = useState("https://www.youtube.com/embed/ssrNcwxALS4?autoplay=1&mute=1")

    let navigate = useNavigate()

    const style = {
        textAlign: 'center',
        fontSize: '30px',
        width: '10rem',
        height: '19rem',
        margin: '33rem 0rem 0rem 5rem',

      };

    const text = {
        position: 'absolute',
        bottom: '8px',
        left: '16px',
        color: 'red'
    }
      const properties = {
        duration: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        indicators: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
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
            <h1 className="homepageTitle">Featured Games</h1>
          <section className="featured" style={{backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover'}}>
              <section className="imageTopDetails">
                {/* <div className="gameTitleFeatured">{title}</div> */}
                {/* <div className="gameDeck">{deck}</div> */}
                {/* <button className="detailsButton" onClick={() => navigate(`/game/${gameId}`)}><span>More Details</span></button> */}
              </section>
              <div className="carousel">
                <Slide {...properties}>
                    {gameImages.map(image => {
                        return <div className="carousel-image" onClick={() => {
                        setBgImg(`${image.background}`)
                        setTitle(`${image.name}`)
                        setDeck(`${image.deck}`)
                        setGameId(`${image.id}`)
                        setGameTrailer(`${image.trailer}`)
                        }}>
                        <div style={style}>
                        <img width="200"
                        height="300"
                        border="1px solid grey"
                        src={`${image.image}`}/></div>
                        </div>
                    })}
                </Slide>
            </div>
          </section>
          <section className="featuredTrailer">
          <iframe width="500" height="300" frameBorder="0"
                src={trailer}>
          </iframe>
          </section>
        </div>
      )
}