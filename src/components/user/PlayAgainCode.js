import { set } from "mithril/route"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { keys } from "../../Settings"
import "./PlayAgainCode.css"
import { PlayAgainResults } from "./PlayAgainResults"

export const PlayAgainCode = () => {
    //match game tags of selected games with random game tag
    //add all tag ids to an array or set?
    //find game with most similar count of id tags

    const [userLibraryGames, setUserLibraryGames] = useState([])
    const [userPicks, setUserPicks] = useState([])
    const [selectState, setSelectState] = useState(false)
    const [allLibraryIds, setAllIds] = useState([])
    const [similarGames, setSimilarGames] = useState([])
    const [similarURLs, setSimilarURLs] = useState(false)
    const [similarGameObject, setSimilarGameObjects] = useState([])

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
            let array = []

            userLibraryGames.map(game => {
                array.push(game?.gameObject?.id)
            })

            setAllIds(array)
        },
        [userLibraryGames]
    )

    useEffect(
        () => {
            let pickURLs = []

            if (userPicks.length !== 0) {
                userPicks.map(pick => {
                    pickURLs.push(`/game/3030-${pick}/?api_key=${keys.giantBombKey}&format=json&field_list=similar_games`)
                })

                setSimilarURLs(pickURLs)
            }

        },
        [userPicks]
    )

    useEffect(
        () => {
            fetchSimilar()
        },
        [similarURLs]
    )

    const fetchSimilar = async () => {
        const response = await Promise.all(
          similarURLs.map((url) => fetch(url).then(res => res.json()))
        )
        const fetchedGames = [].concat.apply([], response);
        setSimilarGames(fetchedGames);
      }

    const selectAll = (boolean) => {  
        let element = document.getElementsByName('gameCheck')

        if(boolean === true) {
            for(let i=0; i<element.length; i++){  
                if(element[i].type=='checkbox')  
                    element[i].checked=true;  
            } 
        }
        if(boolean === false){
            for(let i=0; i<element.length; i++){  
                if(element[i].type=='checkbox')  
                    element[i].checked=false;  
                  
            }  
        }
    
    }

    let picks = []
    
    const handleSeparateCheck = (value) => {

        if (picks.includes(value)) {
            const index = picks.indexOf(value)
                if (index > -1) {
                    picks.splice(index, 1)
                }
        }

        else {
            picks.push(value)
        } 
        
        return picks
    }

    let gameArray = []
    
    const handleAllChecks = (value) => {  

        if (value.length === 0) {
            gameArray = []
            setUserPicks(gameArray)
        }

        else {
            value.map(val => {
                gameArray.push(val)
            })
            setUserPicks(gameArray)
        }

    }

    useEffect(
        () => {
            if(similarURLs === true) {
                let array = [...similarGames]
        
                for (let i = 0; i < array.length; i++) {
                    console.log(array[i])
                }
            }
        },
        [similarURLs]
    )

    useEffect(
        () => {
            let similarGamesArray = []

            for(let game of similarGames) {
                let array = game?.results?.similar_games
                array.map(arr => {
                    console.log('game', arr)
                    similarGamesArray.push(arr)
                })
            }

            setSimilarGameObjects(similarGamesArray)
        },
        [similarGames]
    )

    return <>
    <div>Don't see all your games? Click <Link to="/search">here</Link> to add more!</div>
    <ul>
    {userLibraryGames ? <>
        {userLibraryGames.map(game => {
            return <li>
                <input type="checkbox"
                 id={`${game?.gameObject?.id}`} 
                 value={`${game?.gameObject?.name}`}
                 name="gameCheck"
                 onChange={(event) => {
                     const gameValue = parseInt(event.target.id)
                     handleSeparateCheck(gameValue)
                 }}/>
                <label htmlFor={`${game?.gameObject?.id}`}><img className="gameImage" src={game?.gameObject?.image?.original_url} alt={`${game?.gameObject?.name}`}/></label>
                </li> })}
        {selectState ? 
        <><button onClick={() => 
        {selectAll(false)
        setSelectState(false)
        handleAllChecks([])}}>Deselect All</button>
        <button>Play Again!</button></> : 
            <><button onClick={() => 
            {selectAll(true)
            setSelectState(true)
            handleAllChecks(allLibraryIds)}}>Select All</button>
            <button onClick={() => {
                setUserPicks(picks)
            }}>Play Again!</button></>}
        </> : <div>No games in library.</div>}

    </ul>
    <ul>
        {similarGames.length !== 0 ? <>
        <h3>Results</h3>
        <section className="allResults">
        {similarGameObject.map(game => {
            return <PlayAgainResults key={`game--${game.id}`} id={game.id} />
        })}
        </section>
        </> : null}
    </ul>
    </>
}