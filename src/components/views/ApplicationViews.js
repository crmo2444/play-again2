import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
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

            </Route>
        </Routes>
    )
}