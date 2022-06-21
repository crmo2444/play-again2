import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddGameReview = ({user, game, setter, setNoReviews, gameName}) => {
        const [review, update] = useState({
            userId: user,
            game: game,
            review: "",
            rating: 0,
            date: "",
            gameName: gameName
        })
        const [buttonState, setButtonState] = useState(false)

       let navigate = useNavigate()
    
       const localUser = localStorage.getItem("current_user")
       const localUserObject = JSON.parse(localUser)
    
        const handleSaveButtonClick = (event) => {
            event.preventDefault()

            

            const d = new Date();
            let date = d.toISOString()
    
            let reviewToSendToAPI = {
                userId: user,
                game: game,
                review: review.review,
                rating: review.rating,
                date: date,
                gameName: gameName
            }
    
            fetch(`http://localhost:8088/gameReviews/?_expand=user&game=${game}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewToSendToAPI)
            })
            .then(
                () => {
                    fetch(`http://localhost:8088/gameReviews/?_expand=user&game=${game}`)
                    .then(response => response.json())
                    .then((data) => {
                        setter(data)
                        setNoReviews(false)
                        setButtonState(false)
                    })
                }
            )
        }
    
        return <>
        {buttonState ? <>
            <form className="reviewForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="review">Review: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={review.review}
                            onChange={
                                (event) => {
                                    const copy = {...review}
                                    copy.review = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="rating">Rating: </label>
                        <input
                            required autoFocus 
                            type="number"
                            className="form-control"
                            value={review.rating}
                            onChange={
                                (event) => {
                                    const copy = {...review}
                                    copy.rating = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button onClick={(clickEvent) => 
                    handleSaveButtonClick(clickEvent)
                }
                className="btn btn-primary">
                    Submit Review
                </button>
            </form>
        </> : <button onClick={() => setButtonState(true)}>Add a Review</button>}
            </>
}