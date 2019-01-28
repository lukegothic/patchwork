import React from 'react';
import Patch from './Patch';
const PatchesBoard = ({ patchList, onBuyPatch, playerMoney }) => {
    // patchList: ultimo = posicion actual; 0, 1 y 2 opciones de compra
    return <div className="patchboard">{patchList.map((p, i) => <Patch key={p.id} playerMoney={playerMoney} data={p} onClick={ ([0,1,2].indexOf(i) !== -1) ? () => onBuyPatch(p) : undefined } />)}</div>
}
export default PatchesBoard;