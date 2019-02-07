import React from 'react';
import PatchPlacerTile from './PatchPlacerTile';
import * as BoardHelper from '../BoardHelper';
const PatchPlacer = ({ player, size, onPlacePatch }) => {
    // TODO: better helper
    return <div className="patchPlacer">
        {BoardHelper.getAllTiles(size).map(tile => <PatchPlacerTile key={`pp${tile.join("_")}`} tile={tile} onPlacePatch={() => onPlacePatch(tile)} />)}
    </div>
}
export default PatchPlacer;