import React from 'react';
import SVGPatch from './SVGPatch';
import { BlockSize } from '../Const';
const MaxReducer = (max, value) => max < value ? value : max;
const PatchPattern = <pattern id="pattern" x="10" y="10" width="20" height="20" patternUnits="userSpaceOnUse" >
                        <circle cx="10" cy="10" r="10" style={{stroke:"none", fill: "#0000ff"}}/>
                    </pattern>;
const Patch = ({ patch, playerMoney, onClick, children }) => {
    const h = patch.vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1;
    const w = patch.vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1;
    return <div>
                <svg className="patch" height={h*BlockSize} width={w*BlockSize} onClick={onClick}>
                <defs>{PatchPattern}</defs>
                <SVGPatch vertex={patch.vertex} />
                </svg>
                {children}
            </div>
}
export default Patch;