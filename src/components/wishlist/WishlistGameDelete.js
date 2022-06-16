export const WishlistGameDelete = ({id, setEmpty, setWishlist}) => {
    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    const handleDeleteGame = () => {
        fetch(`http://localhost:8088/wishlistGames/${id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/wishlistGames?userId=${localUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setWishlist(data)
                    }
                    else {
                        setEmpty(false)
                    }
                })
            }
        )
    }

    return <button onClick={(event) => {handleDeleteGame(event)}}>Remove</button>
}