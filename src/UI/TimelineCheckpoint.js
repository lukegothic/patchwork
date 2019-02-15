import React from 'react';
const TimelineCheckpoint = ({checkpoint}) => 
    <div className={`checkpoint ${checkpoint.type}`}></div>;
export default TimelineCheckpoint;