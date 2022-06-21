export const setLibraryGames = (setLibrary) => {
    return fetch(`http://localhost:8088/libraryGames/?_expand=user`)
            .then(response=>response.json())
            .then((data) => {
                setLibrary(data)
            })
}

export const setWishlistGames = (setWishlist) => {
    return fetch(`http://localhost:8088/wishlistGames?_expand=user`)
                .then(response=>response.json())
                .then((data) => {
                    setWishlist(data)
                })
}

export const addToGameLibrary = (newGame, setFeedback) => {
    return fetch('http://localhost:8088/libraryGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Added to Library!")
            })
}

export const addToGameWishlist = (newGame, setFeedback) => {
    return fetch('http://localhost:8088/wishlistGames', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGame)
            })
                .then(response => response.json())
                .then(() => {
                    setFeedback("Added to Wishlist!")
                })
}

export const setAllGameReviews = (gameId, setNoReviews, setGameReviews) => {
    return fetch(`http://localhost:8088/gameReviews/?_expand=user&game=${gameId}`)
                .then(response=>response.json())
                .then((data) => {
                    if(data.length === 0) {
                        setNoReviews(true)
                    }
                    else {
                        setGameReviews(data)
                    }
                })  
}

export const getAllReviews = (setReviews) => {
    return fetch(`http://localhost:8088/gameReviews/?_expand=user`)
            .then(response=>response.json())
            .then((data) => {
                    setReviews(data)  
            })  
}