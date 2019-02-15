import React from 'react';
import { Range } from '../utils';
import TimelineSquare from './TimelineSquare';
import TimelineCheckpoint from './TimelineCheckpoint';
import TimelinePlayer from './TimelinePlayer';
import './timeline.css'
const Timeline = ({ players, checkpoints, size, patchIntent }) => {
    // TODO: remake Timeline mas bonica y con barras para los players
    const activePlayer = players.find(p => p.playing);
    return (
        <div className="timeline">
        {Range(0, size - 1).map(pos => {
            const checkpoint = checkpoints.find(cp => cp.position === pos && cp.pickedup !== true);
            return <TimelineSquare key={`ts${pos}`}>
                {checkpoint && <TimelineCheckpoint key={`tsc${pos}`} checkpoint={checkpoint} />}
                { players.map(player => player.position === pos && <TimelinePlayer key={`pt${player.id}`} player={player.id} isFuture={false} />) }
                { patchIntent && (activePlayer.position + patchIntent.cost.time) === pos && <TimelinePlayer key={`ptf${activePlayer.id}`} player={activePlayer.id} isFuture={true} /> }
            </TimelineSquare>
        })}
        </div>
    );
}
export default Timeline;