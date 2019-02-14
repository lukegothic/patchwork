import React from 'react';
const PlayerTime = ({ player, isFuture }) => <div className={`playermarker ${player}${isFuture ? " future" : ""}`}></div>
export default PlayerTime;