import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { GameDetails } from "../games/GameDetails"
import { GameLibrary } from "../library/GameLibrary"
import { GameSearch } from "../games/GameSearch"
import { GameWishlist } from "../wishlist/GameWishlist"
import { Homepage } from "../homepage/Homepage"
import { PlayAgainCode } from "../user/PlayAgainCode"
import { UserProfile } from "../user/UserProfile"
import { NotificationList } from "../notifications/NotificationList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>

            <Route path="search" element={ <GameSearch /> } />
            <Route path="game/:gameId" element={ <GameDetails /> } />
            <Route path="library" element={ <GameLibrary /> } />
            <Route path="wishlist" element={ <GameWishlist /> } />
            <Route path="play-again" element={ <PlayAgainCode /> } />
            <Route path="/" element={ <Homepage /> } />
            <Route path="profile/:userId" element={ <UserProfile /> } />
            <Route path="notifications" element={ <NotificationList /> } />

            </Route>
        </Routes>
    )
}