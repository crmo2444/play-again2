import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { GameDetails } from "../games/GameDetails"
import { GameLibrary } from "../games/GameLibrary"
import { GameSearch } from "../games/GameSearch"
import { GameWishlist } from "../games/GameWishlist"

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
            <Route path="library" element={ <GameLibrary /> } />
            <Route path="wishlist" element={ <GameWishlist /> } />

            </Route>
        </Routes>
    )
}