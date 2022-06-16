import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./PlayAgainCode.css"

export const PlayAgainCode = () => {
    //match game tags of selected games with random game tag
    //add all tag ids to an array or set?
    //find game with most similar count of id tags

    const [userLibraryGames, setUserLibraryGames] = useState([])
    const [allGames, setAllGames] = useState([])
    const [userPicks, setUserPicks] = useState([])
    const [selectState, setSelectState] = useState(false)
    const [allLibraryGameNames, setAllNames] = useState([])
    const [userPickDetails, setUserPickDetails] = useState([])
    const [pickTags, setPickTags] = useState([])

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
            let nameArray = []

            userLibraryGames.map(game => {
                nameArray.push(game.gameName)
            })

            setAllNames(nameArray)
        },
        [userLibraryGames]
    )

    useEffect(
        () => {
            let gameDetails = []

            if(userPicks.length !== 0) {
                allGames.map(game => {
                    userPicks.map(pick => {
                        if(game.name === pick) {
                            gameDetails.push(game)
                        }
                    })
                })
            }

            setUserPickDetails(gameDetails)
        },
        [userPicks]
    )

    useEffect(
        () => {
            let tags = []

            userPickDetails.map(pickDetails => {
                tags.push(pickDetails.tags)
            })

            setPickTags(tags)
        },
        [userPickDetails]
    )

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

    let gameArr = []

    /* const sendSeparatePicks = (array) => {
        if(array.length !== 0) {
            (allGames.map(game => {
                array.map(arr => {
                    if(game.name === arr) {
                        gameArr.push(game)
                    }
                })
            }))
            setUserPickDetails(gameArr)
        }

    } */

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

    return <>
    <div>Don't see all your games? Click <Link to="/search">here</Link> to add more!</div>
    <ul>
    {userLibraryGames ? <>
        {userLibraryGames.map(game => {
            return <li>
                <div>{game.gameName}</div>
                <input type="checkbox"
                 id={`${game.id}`} 
                 value={`${game.gameName}`}
                 name="gameCheck"
                 onChange={(event) => {
                     const gameValue = event.target.value
                     handleSeparateCheck(gameValue)
                 }}/>
                <label htmlFor={`${game.id}`}><img className="gameImage" src={game.image}/></label>
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
            handleAllChecks(allLibraryGameNames)}}>Select All</button>
            <button onClick={() => {
                setUserPicks(picks)
            }}>Play Again!</button></>}
        </> : <div>No games in library.</div>}
    </ul>
    </>
}