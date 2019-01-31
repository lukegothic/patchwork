import React from 'react';
import Patch from './Patch';
import MarketPatch from './MarketPatch';
const Market = ({ patchList, onBuyPatch, playerMoney }) => {
    // patchList: ultimo = posicion actual; 0, 1 y 2 opciones de compra
    return <div className="patchboard">{patchList.map((p, i) => <MarketPatch key={p.id} playerMoney={playerMoney} {...p} onClick={ ([0,1,2].indexOf(i) !== -1) ? () => onBuyPatch(p) : undefined } />)}</div>
}
export default Market;