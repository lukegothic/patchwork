import React from 'react';
import { Range } from '../utils';
import { BlockSize } from '../Const';
import * as FigureHelper from '../FigureHelper';
const PatchPlacer = ({ player, size, onPlacePatch }) => {
    const allTiles = Range(0, size.w - 1).reduce((acc, col) => acc.concat(Range(0, size.h - 1).reduce((acc2, row) => acc2.concat([[col, row]]), [])), []);
    const usedTiles = player.patches.reduce((acc, item) => acc.concat(FigureHelper.Move(item.vertex, item.at)), []);
    const freeTiles = allTiles.filter(tile => !usedTiles.find(usedT => usedT[0] === tile[0] && usedT[1] === tile[1]));
    return <div className="patchPlacer">
        {freeTiles.map(tile => <div className="tile" style={{ "width": BlockSize, "height": BlockSize, "left": tile[0]*BlockSize, "top":tile[1]*BlockSize}} onClick={ ()=> onPlacePatch(tile) }></div>)}
    </div>
}
export default PatchPlacer;