import React from 'react';
import Patch from './Patch';
import PriceTag from './PriceTag';
const Market = ({ patches, playerAdvance, onBuyPatch, playerMoney }) => {
    // patches: ultimo = posicion actual; 0, 1 y 2 opciones de compra
    return <div className="market">
                <div className="patchcount">{patches.length}</div>
                <div className="patchboard">{patches.map((p, i) => <div key={`market${p.id}`} className={`marketpatch ${i < 3 ? "onsale" : "next"} ${playerMoney >= p.cost.money ? "" : "not"}buyable` } onClick={ (i < 3) ? () => onBuyPatch(p) : undefined }><Patch patch={p}/><PriceTag cost={p.cost} /></div>)}</div>
                <button onClick={() => onBuyPatch(null)}>SKIP +{ playerAdvance }<i className="fa fa-dot-circle"></i> { playerAdvance }<i className="fa fa-hourglass-half"></i></button>
            </div>
}
export default Market;