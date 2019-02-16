import SVGPatch from './SVGPatch';
import * as BoardHelper from '../utils/BoardHelper';
import React from 'react';
import { BlockSize } from '../const';
const PlayerBoard = ({ size, patches, children }) => {
    const vwSize = {
        width: size[0] * BlockSize,
        height: size[1] * BlockSize        
    };
    return <div className="board" style={vwSize}>
                <svg {...vwSize}>
                {patches.map(patch => <SVGPatch fill={patch.fill} key={`pp${patch.id}`} vertex={BoardHelper.MovePatch(patch).vertex} />)}
                </svg>
                {children}
            </div>
}
export default PlayerBoard;