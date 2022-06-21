import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { keys } from "../../Settings"
import { Game } from "./Game"
import "./Game.css"

export const GameSearch = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [games, setGames] = useState([])
    const [searchResultsNumber, setSearchResultsNumber] = useState(0)
    const [resultsDivTen, setResultsDivTen] = useState(0)
    const [buttonArray, setButtonArray] = useState([])
    const [page, setPage] = useState(1)
    const [resultsString, setResultsString] = useState("")
/*     const [steamUser, setSteamUser] = useState([]) */

    useEffect(
        () => {
            let random = Math.floor(Math.random() * 80874)
            fetch(`/games/?api_key=${keys.giantBombKey}&format=json&field_list=id,name,platforms,deck,image&offset=${random}&limit=10`)
                .then(response=>response.json())
                .then((data) => {
                    let array = data.results
                    setGames(array)
                })
        },
        []
    )

    useEffect(
        () => {
            let division = (searchResultsNumber / 10)
            setResultsDivTen(Math.ceil(division))
        },
        [searchResultsNumber]
    )

    useEffect(
        () => {
            let array = []

            for(let i=1; i<=resultsDivTen; i++) {
                array.push(i)
            }

            setButtonArray(array)
        },
        [resultsDivTen]
    )

    useEffect(
        () => {
            let string = ""

            if(page === 1 && searchResultsNumber >= 10) {
                string = "1-10"
            }

            else if(page === 1 && searchResultsNumber <= 10) {
                string = `1-${searchResultsNumber}`
            }

            else {
                if((page * 10) > searchResultsNumber) {
                    string = `${(page-1)}1-${searchResultsNumber}`
                }
                else {
                    string = `${page-1}1-${page}0`
                }
            }

            setResultsString(string)
        },
        [page, searchResultsNumber]
    )

    const searchGames = (value) => {
        fetch(`/search/?api_key=${keys.giantBombKey}&format=json&query=${searchTerms}&resources=game`)
                .then(response=>response.json())
                .then((data) => {
                    setSearchResultsNumber(data.number_of_total_results)
                    let array = data.results
                    setSearchResults(array)
                })
    }

    const showGames = (value, num) => {
        fetch(`/search/?api_key=${keys.giantBombKey}&format=json&query=${searchTerms}&resources=game&page=${num}`)
                .then(response=>response.json())
                .then((data) => {
                    let array = data.results
                    setSearchResults(array)
                })
    }

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
                }
                onKeyPress={(event) => {
                   if(event.key === 'Enter') {
                        searchGames(searchTerms, 1)
                   } 
                }}
                />
            <button onClick={() => searchGames(searchTerms, 1)}>Search</button>

            {searchResults.length !== 0 ? <>
            <div>Showing {resultsString} of {searchResultsNumber} results</div>
            {buttonArray.map(button => {
                if(button === 1) {
                return <button className="pageNumber" onClick={() => 
                    {setPage(button)
                    showGames(searchTerms, button)}} autoFocus>{button}</button>
                }
                else {
                    return <button className="pageNumber" onClick={() => 
                        {setPage(button)
                        showGames(searchTerms, button)}}>{button}</button>
                }
            })}
            <section className="resultsContainer">
            {searchResults.map(result => <Game key={`game--${result.id}`} gameObject={result}/>)}
            </section>
            </> : <>
            <div>Nothing to see here</div>
            </>}
        </div>
    )
}