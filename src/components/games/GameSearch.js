
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { keys } from "../../Settings"
import { Game } from "./Game"
import "./Game.css"

export const GameSearch = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [games, setGames] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8089/games`)
                .then(response=>response.json())
                .then((data) => {
                    setGames(data)
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
                }/>

            {searchResults.length !== 0 ? <>
            {searchResults.map(result => <Game key={`game--${result.id}`} gameObject={result}/>)}
            </> : <>
            {games.map(game => <Game key={`game--${game.id}`} gameObject={game}/>)}
            </>}
        </div>
    )
}