import SVGPolygon from './SVGPolygon';
import * as BoardHelper from '../BoardHelper';
import React from 'react';
import { BlockSize } from '../Const';
const PlayerBoard = ({ size, patches, children }) => {
    const vwSize = {
        h: size.h * BlockSize,
        w: size.w * BlockSize
    };
    return <div className="playerboard" style={{ "height": vwSize.h, "width": vwSize.w }}>
                <svg height={vwSize.h} width={vwSize.w}>
                {patches.map(patch => <SVGPolygon key={`pp${patch.id}`} vertex={BoardHelper.MovePatch(patch).vertex} />)}
                </svg>
                {children}
            </div>
}
export default PlayerBoard;