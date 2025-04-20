import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/HomePanel.css';

function GameCard({ game }) {
    return (
        <Link to={`/details/${parseInt(game.id)}`} className="game-card">
            <img src={`../images/${game.img_path}`} alt={game.tytul} />
            <h3>{game.ocena}</h3>
            <h4>{game.tytul}</h4>
        </Link>
    );
}

export default GameCard;
