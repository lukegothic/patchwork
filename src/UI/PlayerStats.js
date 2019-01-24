import React from 'react';
import PlayerInfo from './PlayerInfo';
const PlayerStats = ({activePlayer, players}) => {
    return (<div className="playerstats">
                Turn is {activePlayer.name}
                {players.map(player => <PlayerInfo key={player.name} player={player} />)}
            </div>)
}
export default PlayerStats;