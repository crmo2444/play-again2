
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { keys } from "../../Settings"
import "./Game.css"

export const GameSearch = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [games, setGames] = useState([])

    let navigate = useNavigate()

    const search = (searchValue) => {

    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/games`)
                .then(response=>response.json())
                .then((data) => {
                    let dataArray = data[0].results
                    setGames(dataArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const searchedGames = games.filter(game => 
                game.name.toLowerCase().startsWith(searchTerms.toLowerCase()))
            setSearchResults(searchedGames)
        },
        [searchTerms]
    )

    return (
        <div>
            <div>Input Title or Keyword</div>
            <input 
                type="text" 
                placeholder="Search..."
                onChange={
                    (changeEvent) => {
                        let search = changeEvent.target.value
                        setSearchTerms(search)
                    }   
                }/>{/* 
            <button onClick={() => {search(searchTerms)}}>Search</button> */}
            {searchResults.length !== 0 ? <>
            {searchResults.map(result => {
                return <section key={`game--${result.id}`}>
                <h4>{result.name}</h4>
                {/* <img className="resultPictures" src={result?.short_screenshots[0]?.image}/> */}
                <button onClick={() => navigate(`/game/${result.id}`)}>Details</button>
                <button>Add to Library</button>
                <button>Add to Wishlist</button>
                </section>
            })}
            </> : <>
            {games.map(game => {
                return <section key={`game--${game.id}`}>
                <h4>{game.name}</h4>
                {/* <img className="resultPictures" src={result?.short_screenshots[0]?.image}/> */}
                <button onClick={() => navigate(`/game/${game.id}`)}>Details</button>
                <button>Add to Library</button>
                <button>Add to Wishlist</button>
                </section>
            })}
            </>}
        </div>
    )
}