import SVGPatch from './SVGPatch';
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
                {patches.map(patch => <SVGPatch key={`pp${patch.id}`} vertex={BoardHelper.MoveFigure(patch.vertex, patch.at)} />)}
                </svg>
                {children}
            </div>
}
export default PlayerBoard;