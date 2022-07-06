import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Review.css"

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

        
        //auto expand textarea
        function adjust_textarea(h) {
            h.style.height = "20px";
            h.style.height = (h.scrollHeight)+"px";
        }
    
        return <>
        {buttonState ? <div classname="reviewContainer">
            {/* <form action="/action_page.php">
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="review">Review </label>
                    </div>
                    <div className="col-75">
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
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="rating">Rating </label>
                    </div>
                    <div className="col-75">
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
                </div>
                <div className="row">
                <button onClick={(clickEvent) => 
                    handleSaveButtonClick(clickEvent)
                }
                className="btn btn-primary">
                    Submit Review
                </button>
                </div>
            </form> */}

        <form class="form-style-7">
            <ul>
            <li>
                <label for="rating">Rating</label>
                <input type="number" name="name" maxlength="100"
                    value={review.rating}
                    onChange={
                        (event) => {
                            const copy = {...review}
                            copy.rating = event.target.value
                            update(copy)
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
                            update(copy)
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
        </div> : <button className="reviewButton" onClick={() => setButtonState(true)}>Add a Review</button>}
            </>
}