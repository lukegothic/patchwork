import React, { Component } from 'react';
import { Patches } from './Data';
import { Range } from './utils';
import './tester.css';
const TestPatch = ({patch}) => {
    if (patch !== null) {
        const blockSize = 40;
        const h = patch.shape.length;
        const w = patch.shape[0].length;
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
        let currentLine = lines[0];
        while (!clipPath.find(cp => currentLine[0][0] == cp[0] && currentLine[0][1] == cp[1])) {
            clipPath.push(currentLine[0]);
            currentLine = lines.find(l => currentLine[1][0] == l[0][0] && currentLine[1][1] == l[0][1]);
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
        return <div className="patch" style={style}>{w}x{h}</div>
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
    // EjeX: x, EjeY: y
    flip = (dir) => {
        if (this.state.patch === null) return;

    }
    // CW: 1, CCW: -1
    rotate = (dir) => {
        if (this.state.patch === null) return;
        const patch = Object.assign(this.state.patch, {});
        const w = patch.shape[0].length;
        const h = patch.shape.length;
        const yRange = Range(0, w-1).sort((a,b) => (a - b) * dir);
        const xRange = Range(0, h-1).sort((a,b) => (b - a) * dir);
        const shape = yRange.map(y => xRange.map(x => patch.shape[x][y]));
        patch.shape = shape;
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
                    <div className="patchList">{Patches.map(p => <button onClick={()=>this.handlePatchClick(p)}>{p.id}</button>)}</div>
                    <div className="patchPreview"><TestPatch patch={this.state.patch} />
                        <button onClick={() => this.rotate(-1)}>CCW</button>
                        <button onClick={() => this.rotate(1)}>CW</button>
                    </div>
                </div>
    }
}
export default Tester;