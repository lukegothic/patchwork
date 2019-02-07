import React from 'react';
import { BlockSize } from '../Const';
import * as BoardHelper from '../BoardHelper';
const PatchPlacer = ({ player, size, onPlacePatch }) => {
    // TODO: better helper
    return <div className="patchPlacer">
        {BoardHelper.getAllTiles(size).map(tile => <div key={`pp${tile.join("_")}`} className="tile" style={{ "width": BlockSize, "height": BlockSize, "left": tile[0]*BlockSize, "top":tile[1]*BlockSize}} onClick={ ()=> onPlacePatch(tile) }></div>)}
    </div>
}
export default PatchPlacer;