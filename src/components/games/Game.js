import { Link } from "react-router-dom"

export const Game = ({gameObject}) => {
    return <section className="game">
                    <div>
                        <Link to={`/games/${gameObject.id}`} >{gameObject.name}</Link>
                    </div>
                    <div>hi</div>
            </section>
}