import React from 'react';
const PlayerInfo = ({player}) => {
    return (<div className={`info ${player.id}`}>
                <strong>{player.name}</strong> <i className="fa fa-dot-circle" />{player.money} BONUS: {player.patches.reduce((acc, item) => acc + item.money, 0)} {player.first7x7 && <i className="fa fa-circle"></i>}
            </div>)
}
export default PlayerInfo;