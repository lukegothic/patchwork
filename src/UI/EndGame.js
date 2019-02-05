import React from 'react';
import * as BoardHelper from '../BoardHelper';
import { MaxReducer } from '../Reducers';
const EndGame = ({ players, size, onRestart }) => {
    players.forEach(p => {
        p.score = p.money + (p.first7x7 ? 7 : 0) - (BoardHelper.getFreeTiles(p, size).length * 2);
    });
    const maxScore = players.map(p => p.score).reduce(MaxReducer, -999);
    let winner = players.filter(p => p.score === maxScore);
    if (winner.length > 1) {    // Gestionar empate
        winner = players.find(p => p.finishPosition === 1);
    }
    winner = winner[0];
    console.log(players);
    return <div className="end"><h1>FIN</h1>
        <h2>{winner.name} is Winner</h2>
        { players.map(p => <div key={`end${p.name}`} className="playersummary"><span className="playername">Player: {p.name}</span> <span className="score">Score: {p.score}</span> <span className="finishposition">Finish position: {p.finishPosition}</span></div>) }
        <button onClick={onRestart}>Restart</button>
    </div>;
}

export default EndGame;