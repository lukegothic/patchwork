import React from 'react';
import SVGPatch from './SVGPatch';
import { BlockSize } from '../const';
import * as PatchHelper from '../utils/PatchHelper';

const Patch = ({ patch, onClick, children }) => {
    const { h, w } = PatchHelper.getDimensions(patch);
    return <React.Fragment>
                <svg height={h*BlockSize} width={w*BlockSize} onClick={onClick}>
                    <SVGPatch fill={patch.fill} vertex={patch.vertex} />
                </svg>
                {children}
            </React.Fragment>
}
export default Patch;