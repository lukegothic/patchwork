import React from 'react';
const PlayerInfo = ({player}) => {
    return (<div className="playerinfo">
                <strong>{player.name}</strong> ${player.money} []{player.pieces.length} <i className="fa fa-dot-circle" /> {player.pieces.reduce((acc, item) => acc + item.money, 0)}
            </div>)
}
export default PlayerInfo;