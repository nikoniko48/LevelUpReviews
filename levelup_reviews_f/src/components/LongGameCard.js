import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/HomePanel.css';

function LongGameCard({ game }) {
    return (
        <Link to={`/details/${game.id}`} className="long-game-card">
            <div className="image-title">
                <img src={`../images/${game.img_path}`} alt={game.tytul}/>
                <h3>{game.tytul}</h3>
            </div>
            <h3>
                {game.srednia_ocena ? parseFloat(game.srednia_ocena).toFixed(1) : "N/A"}
            </h3>
        </Link>
    );
}

export default LongGameCard;
