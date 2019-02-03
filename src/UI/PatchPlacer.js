import React from 'react';
import { BlockSize } from '../Const';
import * as BoardHelper from '../BoardHelper';
const PatchPlacer = ({ player, size, onPlacePatch }) => {
    return <div className="patchPlacer">
        {BoardHelper.getFreeTiles(player, size).map(tile => <div className="tile" style={{ "width": BlockSize, "height": BlockSize, "left": tile[0]*BlockSize, "top":tile[1]*BlockSize}} onClick={ ()=> onPlacePatch(tile) }></div>)}
    </div>
}
export default PatchPlacer;