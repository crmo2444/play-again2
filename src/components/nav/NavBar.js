import { Link, Navigate } from "react-router-dom"
import "./NavBar.css"
import React, { useEffect, useState } from "react"
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'

export const NavBar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [user, setUser] = useState({})

    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/?id=${localUserObject.id}`)
            .then(response=>response.json())
            .then((data) => {
                let single = data[0]
                setUser(single)
            })
        },
        []
    )

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
      }

    const closeMenu = () => {
        setNavbarOpen(false)
      }

    return <>
        <nav className="navBar">
        <button onClick={handleToggle}>{navbarOpen ? (
            <MdClose style={{ color: "#000000", width: "40px", height: "40px" }} />
        ) : (
            <FiMenu style={{ color: "#000000", width: "40px", height: "40px" }} />
        )}</button>
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <li className="navbar__item active">
                <div>Hello {user.firstName}!</div>
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
                <Link className="navbar__link" to={`/profile/${localUserObject.id}`}>Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/notifications">Notifications</Link>
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
        </nav>
        </>
}

