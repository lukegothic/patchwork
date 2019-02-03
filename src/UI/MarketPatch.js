import React from 'react';
import SVGPatch from './SVGPatch';
import { BlockSize } from '../Const';
import PriceTag from './PriceTag';
import Patch from './SVGPatch';
const RotateCW = v => [-1 * v[1], v[0]];
const RotateCCW = v => [v[1], -1 * v[0]];
const FlipX = v => [v[0], -1 * v[1]];
const FlipY = v => [-1 * v[0], v[1]];
const MaxReducer = (max, value) => max < value ? value : max;
const MinReducer = (min, value) => min > value ? value : min;
const MoveToOrigin = (fig) => { // mover la pieza a las coordenadas (0,0)
    // determinar desviacion eje x
    const minx = fig.map(v => v[0]).reduce(MinReducer, 0);
    // determinar desviacion eje y
    const miny = fig.map(v => v[1]).reduce(MinReducer, 0);
    // construir vector corrector de desviacion
    const normV = [Math.abs(minx), Math.abs(miny)];
    // calcular vectores normalizados
    return fig.map(v => [v[0]+normV[0], v[1]+normV[1]]);
}
const PatchPattern = <pattern id="pattern" x="10" y="10" width="20" height="20" patternUnits="userSpaceOnUse" >
                        <circle cx="10" cy="10" r="10" style={{stroke:"none", fill: "#0000ff"}}/>
                    </pattern>;
// TODO: MarketPatch y PlayerPatch
const MarketPatch = ({ id, money, cost, vertex, playerMoney, onClick }) => {
    const h = vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1;
    const w = vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1;
    return <React.Fragment>
                <svg className="patch" height={h*BlockSize} width={w*BlockSize} onClick={onClick}>
                <defs>{PatchPattern}</defs>
                <SVGPatch vertex={vertex} />
                </svg>
                <PriceTag cost={cost} />
            </React.Fragment>
}
export default MarketPatch;