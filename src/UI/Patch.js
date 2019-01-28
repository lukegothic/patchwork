import React from 'react';
import PriceTag from './PriceTag';
import { Range } from '../utils';
const Patch = ({ data, playerMoney, onClick }) => {
    let clip = ["webkitClipPath", "clipPath"].reduce((acc, cur) => {
        acc[cur] = "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)";
        return acc;
    }, {});
    console.log(clip);
    let clip2 = {"color": "#999"};
    return <div style={clip} className={`patch bg${data.id}${onClick ? (playerMoney >= data.cost.money ? " buyable" : " notbuyable") : ""}`} onClick={onClick}>{(data.cost.money + data.cost.time > 0) && <PriceTag cost={data.cost} />}<div className="money">{Range(1, data.money).map(i => <i className="fa fa-dot-circle" />)}</div></div>;
}
export default Patch;