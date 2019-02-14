import SVGPolygon from './SVGPolygon';
import * as BoardHelper from '../BoardHelper';
import React from 'react';
import { BlockSize } from '../Const';
const PlayerBoard = ({ size, patches, children }) => {
    const vwSize = {
        height: size.h * BlockSize,
        width: size.w * BlockSize
    };
    return <div className="playerboard" style={vwSize}>
                <svg {...vwSize}>
                {patches.map(patch => <SVGPolygon fill={patch.fill} key={`pp${patch.id}`} vertex={BoardHelper.MovePatch(patch).vertex} />)}
                </svg>
                {children}
            </div>
}
export default PlayerBoard;