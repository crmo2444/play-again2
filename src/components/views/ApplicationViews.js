import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { GameDetails } from "../games/GameDetails"
import { GameSearch } from "../games/GameSearch"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Play Again</h1>

                    <Outlet />
                </>
            }>

            <Route path="search" element={ <GameSearch /> } />
            <Route path="game/:gameId" element={ <GameDetails /> } />

            </Route>
        </Routes>
    )
}