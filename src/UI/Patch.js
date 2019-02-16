import React from 'react';
import SVGPatch from './SVGPatch';
import { BlockSize } from '../const';
import * as PatchHelper from '../utils/PatchHelper';

const Patch = ({ patch, onClick, children }) => {
    const patchSize = PatchHelper.getDimensions(patch);
    return <React.Fragment>
                <svg width={patchSize[0]*BlockSize} height={patchSize[1]*BlockSize} onClick={onClick}>
                    <SVGPatch fill={patch.fill} vertex={patch.vertex} />
                </svg>
                {children}
            </React.Fragment>
}
export default Patch;