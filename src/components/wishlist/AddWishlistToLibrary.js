import { useEffect, useState } from "react"
import { addToGameLibrary, setLibraryGames } from "../../FetchRequests"
import { BiLibrary } from 'react-icons/bi'
import { IconContext } from "react-icons";

export const AddWishlistToLibrary = ({id, setEmpty, setWishlist, platform, gameObj}) => {
    const [library, setLibrary] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const [feedback, setFeedback] = ("")

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            setLibraryGames(setLibrary)
        },
        []
    )

    const checkLibrary = () => {
        let foundGame = false
        let name

        library.map(game => {
            if (game?.gameObject?.id === gameObj?.gameObject?.id && game.platform === platform && game.userId === localUserObject.id) {
                game.gameObject.platforms.map(plat => {
                    if(platform === plat) {
                        name = plat.name
                    }
                })
                foundGame = true
            }
        })

        if (foundGame) {
            return window.alert(`${gameObj?.gameObject?.name} on ${name} already in library.`)
        }
        else {
            addToLibrary()
        }
        
    }

    const addToLibrary = () => {

        const d = new Date();
        let date = d.toISOString()

        const newGame = {
            userId: localUserObject.id,
            gameObject: gameObj.gameObject,
            platform: platform,
            date: date
        }
    
        // TODO: Perform the fetch() to POST the object to the API
        addToGameLibrary(newGame, setFeedback)
        handleDeleteGame()
    }

    const handleDeleteGame = () => {
        fetch(`http://localhost:8088/wishlistGames/${id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/wishlistGames?userId=${localUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setWishlist(data)
                    }
                    else {
                        setEmpty(false)
                    }
                })
            }
        )
    } 
    return <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "30"}}>
    <div>
      <BiLibrary title="Add to Library" onClick={()=>checkLibrary()}/>
    </div>
  </IconContext.Provider>
}