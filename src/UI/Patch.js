import React from 'react';
import SVGPolygon from './SVGPolygon';
import { BlockSize } from '../Const';
import * as PatchHelper from '../PatchHelper';

const Patch = ({ patch, onClick, children }) => {
    const { h, w } = PatchHelper.getDimensions(patch);
    return <React.Fragment>
                <svg height={h*BlockSize} width={w*BlockSize} onClick={onClick}>
                    <SVGPolygon fill={patch.id} vertex={patch.vertex} />
                </svg>
                {children}
            </React.Fragment>
}
export default Patch;