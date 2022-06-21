export const DeleteGameReview = ({id, game, setter}) => {
    const localUser = localStorage.getItem("current_user")
    const localUserObject = JSON.parse(localUser)

    const handleDeleteGame = () => {
        fetch(`http://localhost:8088/gameReviews/${id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/gameReviews/?_expand=user&game=${game}`)
                .then(response => response.json())
                .then((data) => {
                    setter(data)
                })
            }
        )
    }

    return <button onClick={(event) => {handleDeleteGame(event)}}>Delete</button>
}