import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllReviews, setLibraryGames, setWishlistGames } from "../../FetchRequests"

export const HomepageActivity = () => {
    const [gameReviews, setReviews] = useState([])
    const [gameLibrary, setAllGameLibraries] = useState([])
    const [gameWishlist, setAllGameWishlists] = useState([])
    const [mostRecentActivity, setMostRecentActivity] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            getAllReviews(setReviews)
            setLibraryGames(setAllGameLibraries)
            setWishlistGames(setAllGameWishlists)
        },
        []
    )

    useEffect(
        () => { 
            let lastFiveReviews = gameReviews.slice(-5)
            let lastFiveLibrary = gameLibrary.slice(-5)
            let lastFiveWishlist = gameWishlist.slice(-5)

            let sorted = []

            lastFiveReviews.map(review => {
                sorted.push({
                    date: review.date,
                    review: true,
                    library: false,
                    wishlist: false,
                    user: review.user,
                    gameName: review.gameName,
                    game: review.game
                })
            })

            lastFiveLibrary.map(library => {
                sorted.push({
                    date: library.date,
                    review: false,
                    library: true,
                    wishlist: false,
                    user: library.user,
                    gameName: library?.gameObject?.name,
                    game: library?.gameObject?.id
                })
            })

            lastFiveWishlist.map(wishlist => {
                sorted.push({
                    date: wishlist.date,
                    review: false,
                    library: false,
                    wishlist: true,
                    user: wishlist.user,
                    gameName: wishlist?.gameObject?.name,
                    game: wishlist?.gameObject?.id
                })
            })

            sorted.sort(function(a, b) {
                return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
            })

            let mostRecent = (sorted.slice(-5)).reverse()

            setMostRecentActivity(mostRecent)
        },
        [gameReviews, gameLibrary, gameWishlist]
    )

    const recentActivity = (activity) => {
        let date = activity.date
        let day = date.substring(0,10)
        let time = date.substring(11,16)

        const [year, month, days] = day.split('-');
        const formattedDate = `${month}/${days}/${year}`

        let formattedTime = toStandardTime(time)

        if(activity.review === true) {
            return <>
            <div className="line-one"><Link to={`/profile/${activity?.user?.id}`}>{activity?.user?.firstName} {activity?.user?.lastName}</Link> reviewed {activity.gameName}!</div>
            <div className="line-two">{formattedDate}</div>
            <button onClick={() => navigate(`/game/${activity.game}`)}>See Details</button>
            </>
        }

        else if(activity.library === true) {
            return <>
            <div className="line-one">{activity?.user?.firstName} {activity?.user?.lastName} added {activity.gameName} to their library!</div>
            <div className="line-two">{formattedDate}</div>
            </>
        }

        else if(activity.wishlist === true) {
            return <>
            <div className="line-one">{activity?.user?.firstName} {activity?.user?.lastName} added {activity.gameName} to their wishlist!</div>
            <div className="line-two">{formattedDate}</div>
            </>
        }
    }

    const toStandardTime = (time) => {
        let timeParts = time.split(":");
        let standardTime = "";

        if (parseInt(timeParts[0]) > 12) {
            timeParts[0] = timeParts[0] - 12;
            standardTime = timeParts.join(":") + " PM";
        } else if (parseInt(timeParts[0]) === 12) {
            standardTime = timeParts.join(":") + " PM";
        } else {
            standardTime = timeParts.join(":") + " AM";
        }

        return standardTime;
    }

    return <section className="recentActivity">
    <h3>Recent Activity</h3>
        {mostRecentActivity ? <>
            {mostRecentActivity.map(activity => {
                return <section className="activity">
                    {recentActivity(activity)}
                </section>
            })}
        </> : null}
    </section>
}