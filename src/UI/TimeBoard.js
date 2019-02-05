import React from 'react';
import { Range } from '../utils';
import TimeBoardSquare from './TimeBoardSquare';
import TimeBoardCheckpoint from './TimeBoardCheckpoint';
import PlayerTime from './PlayerTime';
const TimeBoard = ({ players, checkpoints, size }) => {
    // TODO: remake TimeBoard mas bonica y con barras para los players
    return (
        <div className="timeboard">{
            Range(0, size - 1).map(pos => {
                const checkpoint = checkpoints.find(cp => cp.position === pos && cp.pickedup !== true);
                return <TimeBoardSquare key={`ts${pos}`}>{ players.map(player => player.position === pos && <PlayerTime key={`pt${player.name}`} player={player.name} />) }{checkpoint && <TimeBoardCheckpoint key={`tsc${pos}`} checkpoint={checkpoint} />}</TimeBoardSquare>
            })
        }</div>
    );
}
export default TimeBoard;