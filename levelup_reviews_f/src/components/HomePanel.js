import '../assets/HomePanel.css'
import LongGameCard from "./LongGameCard";
import {useEffect, useState} from "react";
import axios from "axios";
import GameCard from "./GameCard";

function HomePanel() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('/api/reviews')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania recenzji:', error);
            });
    }, []);

    console.log(reviews);

    return (
        <div className="home-panel">
            <h1 className='catch-phrase'>Level Up Your Insights on Gaming</h1>
            <div className="top-new-games">
                <h1>Top new games</h1>
                <p>Don't miss out on top new popular games. Check them out!</p>
                <div className='horizontal-list'>
                    {reviews.slice(0, 4).map((review, index) => (
                        <GameCard key={index} game={review} />
                    ))}
                </div>
                <div className='best-on-and-by-genre'>
                    <div className='best-on-list'>
                        <h1>Best on</h1>
                        <div className='best-on-buttons'>
                            <button>PC</button>
                            <button>PS5</button>
                            <button>Nintendo Switch</button>
                            <button>Xbox One</button>
                        </div>
                        <div className='vertical-list'>
                            {reviews.slice(0, 6).map((review, index) => (
                                <LongGameCard key={index} game={review} />
                            ))}
                        </div>
                    </div>
                    <div className='by-genre-list'>
                        <h1>Best by genre</h1>
                        <select>
                            <option value="action">Action</option>
                            <option value="adventure">Adventure</option>
                            <option value="rpg">RPG</option>
                            <option value="strategy">Strategy</option>
                            <option value="simulation">Simulation</option>
                            <option value="sports">Sports</option>
                        </select>
                        <div className='vertical-list'>
                            {reviews.slice(0, 6).map((review, index) => (
                                <LongGameCard key={index} game={review} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePanel;
