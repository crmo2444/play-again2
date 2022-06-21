import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddGameReview = ({user, game, setter}) => {
        const [review, update] = useState({
            userId: user,
            game: game,
            review: "",
            rating: 0,
        })
        const [buttonState, setButtonState] = useState(false)

       let navigate = useNavigate()
    
       const localUser = localStorage.getItem("current_user")
       const localUserObject = JSON.parse(localUser)
    
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
            let reviewToSendToAPI = {
                userId: user,
                game: game,
                review: review.review,
                rating: review.rating
            }
    
            fetch(`http://localhost:8088/gameReviews/?_expand=user&game=${game}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewToSendToAPI)
            })
                .then(response => response.json())
                .then((data) => {
                    setter(data)
                })
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