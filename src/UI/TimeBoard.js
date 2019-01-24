import React from 'react';
import { TimeBoardBaseLayout } from '../Data';
import { Range } from '../utils';
import TimeBoardSquare from './TimeBoardSquare';
import TimeBoardCheckpoint from './TimeBoardCheckpoint';
import PlayerTime from './PlayerTime';
const TimeBoard = ({players}) => {
    return (
        <div className="timeboard">{
            Range(0, TimeBoardBaseLayout.size - 1).map(pos => {
                const squareCheckpoint = TimeBoardBaseLayout.checkpoints.find(s => s.position === pos);
            return <TimeBoardSquare key={`ts${pos}`}>{(players[0].position === pos) && <PlayerTime player={1} />}{(players[1].position === pos) && <PlayerTime player={2} />}{squareCheckpoint && <TimeBoardCheckpoint key={`tsc${pos}`} checkpoint={squareCheckpoint} />}</TimeBoardSquare>
            })
        }</div>
    );
}
export default TimeBoard;


// .fa-square
// .fa-dot-circle