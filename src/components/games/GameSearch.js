
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { keys } from "../../Settings"
import { Game } from "./Game"
import "./Game.css"

export const GameSearch = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [games, setGames] = useState([])
    const [steamUser, setSteamUser] = useState([])
    const [giantGame, setGiant] = useState([])

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

    const findSteam = () => {
        fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=87A9DEACDB46DA8B2A3D84B9046534EC&steamids=76561198319765295`)
                .then(response=>response.json())
                .then((data) => {
                    setSteamUser(data)
                })
        console.log('test')
    }

    const findGame = () => {
        fetch(`http://www.giantbomb.com/api/game/3030-4725/?api_key=edd21d73fe85dfb06fea141f11a7c28379c0b315&format=json`)
                .then(response=>response.json())
                .then((data) => {
                    setGiant(data)
                })
    }

    return (
        <div>
            <button onClick={(event) => findSteam(event)}>Find Steam</button>
            <button onClick={(event) => findGame(event)}>Test</button>
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