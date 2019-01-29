import React, { Component } from 'react';
import { Patches } from './Data';
import { Range } from './utils';
import './tester.css';
/*
todo: map fn
const Rotate = () => 
const Flip = () => 
*/
const MaxReducer = (max, dim) => max < dim ? dim : max;
const MinReducer = (min, dim) => min > dim ? dim : min;
const MoveToOrigin = (fig) => {
    // normalizar a 0,0
    const minx = fig.map(v => v[0]).reduce(MinReducer, 0);
    const miny = fig.map(v => v[1]).reduce(MinReducer, 0);
    const normV = [Math.abs(minx), Math.abs(miny)];
    return fig.map(v => [v[0]+normV[0], v[1]+normV[1]]);
}
const TestPatch = ({patch}) => {
    if (patch !== null) {
        const blockSize = 40;
        const h = patch.vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1;
        const w = patch.vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1;
        // calculate clipPath --> parejas de (x y)
        let clipPath = [];
        // 1. expandir vertices a 2d (cuadrados)
        const sqr_matrix = [[0,0],[0,1],[1,1],[1,0]];
        const vertex_as2d = patch.vertex.map(v => sqr_matrix.map(vshp => [v[0]+vshp[0],v[1]+vshp[1]]));
        console.log(vertex_as2d);
        // 2. calcular lineas
        let lines = [];
        vertex_as2d.forEach(v2d => {
            for (var c = 0, n = 1; c < v2d.length; c++, n++) {
                lines.push([v2d[c], v2d[n === v2d.length ? 0 : n]]);
            }
        });
        console.log(lines);
        // 3. eliminar las lineas repetidas (son lineas interiores)
        lines = lines.filter(l => !lines.find(lfind => l[0][0] === lfind[1][0] && l[0][1] === lfind[1][1] && l[1][0] === lfind[0][0] && l[1][1] === lfind[0][1]));
        console.log(lines);
        // 4. calcular el path de dibujado
        const isRepeatedPath = () => clipPath.find(cp => currentPath[0][0] === cp[0] && currentPath[0][1] === cp[1]);
        const nextPath = () => lines.find(l => currentPath[1][0] === l[0][0] && currentPath[1][1] === l[0][1]);
        let currentPath = lines[0];
        while (!isRepeatedPath()) {
            clipPath.push(currentPath[0]);
            currentPath = nextPath(); 
        }
        console.log(clipPath);
        // 5. convertir cliPath a css
        if (clipPath.length > 0) {
            clipPath = `polygon(${clipPath.map(pos => `${pos[0]*blockSize}px ${pos[1]*blockSize}px`).join(",")})`;
        } else {
            clipPath = "";
        }
        const style = {
            "width": w * blockSize,
            "height": h * blockSize,
            "lineHeight": `${h * blockSize}px`,
            "clipPath": clipPath
        }
        return <div>
                    <div className="patch" style={style}>{w}x{h}</div>
                    <div>Buttons = {patch.money}</div>
                    <div>Cost = Money:{patch.cost.money} Time:{patch.cost.time}</div>
                </div>
    } else {
        return null;
    }
}
class Tester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patch: null
        }
    }
    // EjeX: 1, EjeY: -1
    flip = (dir) => {
        if (this.state.patch === null) return;
        const patch = Object.assign(this.state.patch, {});
        patch.vertex = MoveToOrigin(patch.vertex.map(v => [1 * dir * v[0], -1 * dir * v[1]]));       
        this.setState({
            patch: patch
        });
    }
    // CW: 1, CCW: -1
    rotate = (dir) => {
        if (this.state.patch === null) return;
        const patch = Object.assign(this.state.patch, {});
        patch.vertex = MoveToOrigin(patch.vertex.map(v => [-1 * dir * v[1], 1 * dir * v[0]]));
        this.setState({
            patch: patch
        });
    }
    handlePatchClick = (p) => {
        this.setState({
            patch: p
        });
    }
    render = () => {
        return <div>
                    <div className="patchList">{Patches.map(p => <button className={this.state.patch && this.state.patch.id === p.id && "selected"} onClick={()=>this.handlePatchClick(p)}>{p.id}</button>)}</div>
                    <div className="patchPreview"><TestPatch patch={this.state.patch} />
                        <button onClick={() => this.rotate(-1)}>CCW</button>
                        <button onClick={() => this.rotate(1)}>CW</button>
                        <button onClick={() => this.flip(1)}>Flip X</button>
                        <button onClick={() => this.flip(-1)}>Flip Y</button>
                    </div>
                </div>
    }
}
export default Tester;