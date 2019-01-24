import React from 'react';
const TimeBoardCheckpoint = ({checkpoint}) => <div className={`timecheckpoint ${checkpoint.type}`}>{checkpoint.type === "money" ? <i className="fa fa-dot-circle"></i>: undefined}</div>;
export default TimeBoardCheckpoint;