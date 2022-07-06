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

        fetch(`http://localhost:8088/gameReviews/${reviewObject.id}`, {
            method: "PUT",
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
                    setButtonState(false)
                })
            }
        )
    }

    return <>
    {buttonState ? <form class="form-style-7">
            <ul>
            <li>
                <label for="rating">Rating</label>
                <input type="number" name="name" maxlength="100"
                    value={review.rating}
                    onChange={
                        (event) => {
                            const copy = {...review}
                            copy.rating = event.target.value
                            setReview(copy)
                        }
                    }/>
                <span>Enter rating (0-10)...</span>
            </li>
            <li>
                <label for="review">Review</label>
                <input type="text" name="review" maxlength="100" maxheight="500"
                    className="form-control"
                    value={review.review}
                    onChange={
                        (event) => {
                            const copy = {...review}
                            copy.review = event.target.value
                            setReview(copy)
                        }
                    }/>
                <span>Enter review here...</span>
            </li>

            <li>
                <input type="submit" value="Submit" 
                onClick={(clickEvent) => 
                    handleSaveButtonClick(clickEvent)
                }/>
            </li>
            </ul>
        </form>
         : <button onClick={() => setButtonState(true)}>Edit</button>}
    </>
}