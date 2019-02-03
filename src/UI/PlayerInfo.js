import React from 'react';
const PlayerInfo = ({player}) => {
    return (<div className={`playerinfo ${player.name}`}>
                <strong>{player.name}</strong> ${player.money} []{player.patches.length} <i className="fa fa-dot-circle" /> {player.patches.reduce((acc, item) => acc + item.money, 0)}
            </div>)
}
export default PlayerInfo;