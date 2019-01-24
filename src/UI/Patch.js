import React from 'react';
import PriceTag from './PriceTag';
const Patch = ({ data, onClick }) => {
    return <div className={`patch${onClick ? " buyable" : ""}`} onClick={onClick}>{data.id}{(data.cost.money + data.cost.time > 0) && <PriceTag cost={data.cost} />}</div>;
}
export default Patch;