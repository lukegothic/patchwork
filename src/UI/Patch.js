import React from 'react';
import PriceTag from './PriceTag';
import { Range } from '../utils';
const Patch = ({ data, playerMoney, onClick }) => {
    return <div className={`patch${onClick ? (playerMoney >= data.cost.money ? " buyable" : " notbuyable") : ""}`} onClick={onClick}>{(data.cost.money + data.cost.time > 0) && <PriceTag cost={data.cost} />}<div className="money">{Range(1, data.money).map(i => <i className="fa fa-dot-circle" />)}</div></div>;
}
export default Patch;