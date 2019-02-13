import React from 'react';
import SVGPolygon from './SVGPolygon';
import { BlockSize } from '../Const';
import { MaxReducer } from '../Reducers';
const Patch = ({ patch, onClick, children }) => {
    const h = patch.vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1;
    const w = patch.vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1;
    return <React.Fragment>
                <svg height={h*BlockSize} width={w*BlockSize} onClick={onClick}>
                    <SVGPolygon fill={patch.id} vertex={patch.vertex} />
                </svg>
                {children}
            </React.Fragment>
}
export default Patch;