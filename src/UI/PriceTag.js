import React from 'react';
const PriceTag = ({ cost }) => {
    return (<div className="pricetag">
        {cost.money > 0 && <span className="money">{cost.money}<i className="fa fa-dot-circle"></i></span>}
        {cost.time > 0 && <span className="time">{cost.time}<i className="fa fa-hourglass-half"></i></span>}
    </div>);
}
export default PriceTag;