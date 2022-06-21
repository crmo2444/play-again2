import { useEffect, useState } from "react"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

export const HomepageFeatured = ({gameImages}) => {

    const style = {
        textAlign: 'center',
        fontSize: '30px',
        width: '10rem',
        height: '30rem',
        margin: '0rem 0rem 0rem 5rem'
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
                    slidesToShow: 4,
                    slidesToScroll: 4
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
            <h1>Featured Games</h1>
          <div>
            <Slide {...properties}>
                {gameImages.map(image => {
                    return <>
                    <div style={style}>
                    <img width="300"
                     height="400"
                     border="1px solid grey"
                     box-shadow="5px 4px #888888" 
                     src={`${image.image}`}/></div>
                    </>
                })}
            </Slide>
          </div>
        </div>
      )
}