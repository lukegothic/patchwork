import React from 'react';
const TimeBoardCheckpoint = ({checkpoint}) => 
    <div className={`timecheckpoint ${checkpoint.type}`}></div>;
export default TimeBoardCheckpoint;