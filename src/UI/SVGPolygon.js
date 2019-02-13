import React from 'react';
import { BlockSize } from '../Const';
const SVGPolygon = ({ vertex, fill }) => {
    // calculate clipPath --> parejas de (x,y)
    let clipPath = [];
    // 1. transformar vertices 1d a 2d (cuadrados)
    const sqr_matrix = [[0,0],[0,1],[1,1],[1,0]];
    const vertex_as2d = vertex.map(v => sqr_matrix.map(vshp => [v[0]+vshp[0],v[1]+vshp[1]]));
    // 2. calcular lineas
    let lines = [];
    vertex_as2d.forEach(v2d => {
        for (var c = 0, n = 1; c < v2d.length; c++, n++) {
            lines.push([v2d[c], v2d[n === v2d.length ? 0 : n]]);
        }
    });
    // 3. eliminar las lineas repetidas (son lineas interiores)
    lines = lines.filter(l => !lines.find(lfind => l[0][0] === lfind[1][0] && l[0][1] === lfind[1][1] && l[1][0] === lfind[0][0] && l[1][1] === lfind[0][1]));
    // 4. calcular el path de dibujado
    const isRepeatedPath = () => clipPath.find(cp => currentPath[0][0] === cp[0] && currentPath[0][1] === cp[1]);
    const nextPath = () => lines.find(l => currentPath[1][0] === l[0][0] && currentPath[1][1] === l[0][1]);
    let currentPath = lines[0];
    while (!isRepeatedPath()) {
        clipPath.push(currentPath[0]);
        currentPath = nextPath(); 
    }
    return <polygon className="SVGPolygon" fill={`url(#p${fill})`} points={clipPath.map(pos => `${pos[0]*BlockSize},${pos[1]*BlockSize}`).join(" ")} />
}
export default SVGPolygon;