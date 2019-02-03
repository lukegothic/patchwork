import React from 'react';
import { TimeBoardBaseLayout } from '../Data';
import { Range } from '../utils';
import TimeBoardSquare from './TimeBoardSquare';
import TimeBoardCheckpoint from './TimeBoardCheckpoint';
import PlayerTime from './PlayerTime';
const TimeBoard = ({ players }) => {
    return (
        <div className="timeboard">{
            Range(0, TimeBoardBaseLayout.size - 1).map(pos => {
                const checkpoint = TimeBoardBaseLayout.checkpoints.find(cp => cp.position === pos && cp.pickedup !== true);
                return <TimeBoardSquare key={`ts${pos}`}>{ players.map(player => player.position === pos && <PlayerTime player={player.name} />) }{checkpoint && <TimeBoardCheckpoint key={`tsc${pos}`} checkpoint={checkpoint} />}</TimeBoardSquare>
            })
        }</div>
    );
}
export default TimeBoard;