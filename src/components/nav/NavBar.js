import { Link, Navigate } from "react-router-dom"
import "./NavBar.css"
import React from "react"

export const NavBar = () => {

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    return <>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Homepage/Logo</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/search">Find Games</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/library">My Game Library</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/wishlist">My Wishlist</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/play-again">Play Again!</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>

            {
                localStorage.getItem("current_user")
                    ?
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("current_user")
                    Navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
            : ""
            }
        </ul>
        </>
}

