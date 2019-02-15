import React from 'react';
import PlayerInfo from './PlayerInfo';
import PlayerBoard from './PlayerBoard';
import PatchPlacer from './PatchPlacer';
import './player.css';
const Player = ({ size, player, patch, onPlacePatch }) => {
    return (
       <div className={`player ${player.id}`}>
           <PlayerInfo player={player} />
           <PlayerBoard size={size} patches={player.patches}>
                {patch && player.playing && <PatchPlacer player={player} size={size} patch={patch} onPlacePatch={onPlacePatch} />}
           </PlayerBoard>
       </div>
    )
}
export default Player;