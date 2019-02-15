import SVGPatch from './SVGPatch';
import * as BoardHelper from '../utils/BoardHelper';
import React from 'react';
import { BlockSize } from '../const';
const PlayerBoard = ({ size, patches, children }) => {
    const vwSize = {
        height: size.h * BlockSize,
        width: size.w * BlockSize
    };
    return <div className="board" style={vwSize}>
                <svg {...vwSize}>
                {patches.map(patch => <SVGPatch fill={patch.fill} key={`pp${patch.id}`} vertex={BoardHelper.MovePatch(patch).vertex} />)}
                </svg>
                {children}
            </div>
}
export default PlayerBoard;