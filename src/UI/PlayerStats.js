import React from 'react';
import PlayerInfo from './PlayerInfo';
const PlayerStats = ({ players }) => {
    return (<div className="playerstats">
                Turn is {players[0].name}
                {players.map(player => <PlayerInfo key={player.name} player={player} />)}
            </div>)
}
export default PlayerStats;