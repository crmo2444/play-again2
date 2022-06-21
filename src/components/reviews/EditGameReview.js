import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EditGameReview = ({reviewObject, game, setter, user}) => {
    const [buttonState, setButtonState] = useState(false)
    const [review, setReview] = useState({
        userId: reviewObject.userId,
        game: game,
        review: reviewObject.review,
        rating: reviewObject.rating
    })

    let navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        let reviewToSendToAPI = {
            userId: user,
            game: game,
            review: review.review,
            rating: review.rating
        }
                    
        setButtonState(false)

        fetch(`http://localhost:8088/gameReviews/${reviewObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewToSendToAPI)
        })
            .then(fetch(`http://localhost:8088/gameReviews/?_expand=user&game=${game}`)
                .then(response => response.json())
                .then((data) => {
                        setter(data)
                })
            )

    }

    return <>
    {buttonState ? <form className="reviewForm">
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
                                    setReview(copy)
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
                                    setReview(copy)
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
         : <button onClick={() => setButtonState(true)}>Edit</button>}
    </>
}