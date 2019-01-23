import React from 'react';
const PriceTag = ({ cost }) => {
    return (<div className="price">
        {cost.money > 0 && <span className="money">M{cost.money}</span>}
        {cost.time > 0 && <span className="time">T{cost.time}</span>}
    </div>);
}
export default PriceTag;