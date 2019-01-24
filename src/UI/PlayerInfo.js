import React from 'react';
const PlayerInfo = ({player}) => {
    return (<div className="playerinfo">
                {player.name} {player.money} {player.pieces}
            </div>)
}
export default PlayerInfo;