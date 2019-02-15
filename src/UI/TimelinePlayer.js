import React from 'react';
const TimelinePlayer = ({ player, isFuture }) => <div className={`player ${player}${isFuture ? " future" : ""}`}></div>
export default TimelinePlayer;