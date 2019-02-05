import React from 'react';
import Patch from './Patch';
import PriceTag from './PriceTag';
const Market = ({ patches, playerAdvance, onBuyPatch, playerMoney }) => {
    // patches: ultimo = posicion actual; 0, 1 y 2 opciones de compra
    return <div className="market">
                <div className="patchcount">{patches.length}</div>
                <div className="patchboard">{patches.map((p, i) => <Patch key={`market${p.id}`} playerMoney={playerMoney} patch={p} onClick={ ([0,1,2].indexOf(i) !== -1) ? () => onBuyPatch(p) : undefined }><PriceTag cost={p.cost} /></Patch>)}</div>
                <button onClick={() => onBuyPatch(null)}>DESCANSAR +{ playerAdvance }<i className="fa fa-dot-circle"></i> { playerAdvance }<i className="fa fa-hourglass-half"></i></button>
            </div>
}
export default Market;