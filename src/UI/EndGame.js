import React from 'react';
import * as BoardHelper from '../utils/BoardHelper';
import { MaxReducer } from '../utils/Reducers';
import './end.css';
const EndGame = ({ players, size, onRestart }) => {
    players.forEach(p => {
        p.score = p.money + p.bonuses.reduce((acc, b) => acc + b.points, 0) - (BoardHelper.getFreeTiles(p, size).length * 2);
    });
    const maxScore = players.map(p => p.score).reduce(MaxReducer, -999);
    let winner = players.filter(p => p.score === maxScore);
    if (winner.length > 1) {    // Gestionar empate
        winner = players.find(p => p.finishPosition === 1);
    }
    winner = winner[0];
    return <div className="end"><h1>FIN</h1>
        <h2>{winner.name} is Winner</h2>
        { players.map(p => <div key={`end${p.id}`} className="playersummary"><span className="playername">Player: {p.name}</span> <span className="score">Score: {p.score}</span> <span className="finishposition">Finish position: {p.finishPosition}</span></div>) }
        <button onClick={onRestart}>Restart</button>
    </div>;
}

export default EndGame;