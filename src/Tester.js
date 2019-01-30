import React, { Component } from 'react';
import { Patches } from './Data';
import './tester.css';
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
const DrawPatch = ({patch}) => {
    if (patch !== null) {
        const blockSize = 40;
        const h = patch.vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1;
        const w = patch.vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1;
        // calculate clipPath --> parejas de (x,y)
        let clipPath = [];
        // 1. transformar vertices 1d a 2d (cuadrados)
        const sqr_matrix = [[0,0],[0,1],[1,1],[1,0]];
        const vertex_as2d = patch.vertex.map(v => sqr_matrix.map(vshp => [v[0]+vshp[0],v[1]+vshp[1]]));
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
        // 5. convertir cliPath a css
        const cssClipPath = (clipPath.length > 0) ? `polygon(${clipPath.map(pos => `${pos[0]*blockSize}px ${pos[1]*blockSize}px`).join(",")})` : "";
        const style = {
            "width": w * blockSize,
            "height": h * blockSize,
            "lineHeight": `${h * blockSize}px`,
            "clipPath": cssClipPath
        }
        /*return <div>
                    <div className="patch" style={style}>{w}x{h}</div>
                    <div>Buttons = {patch.money}</div>
                    <div>Cost = Money:{patch.cost.money} Time:{patch.cost.time}</div>
                </div>*/
        return <svg height={style.height} width={style.width}>
                <polygon className="testpatch" points={clipPath.map(pos => `${pos[0]*blockSize},${pos[1]*blockSize}`).join(" ")} />
                </svg>
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
    applyTransform = (transformFn) => {
        if (this.state.patch === null) return;
        const patch = Object.assign(this.state.patch, {});
        patch.vertex = MoveToOrigin(patch.vertex.map(transformFn));
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
                    <div className="patchPreview"><DrawPatch patch={this.state.patch} />
                        <button onClick={() => this.applyTransform(RotateCCW)}>CCW</button>
                        <button onClick={() => this.applyTransform(RotateCW)}>CW</button>
                        <button onClick={() => this.applyTransform(FlipX)}>Flip X</button>
                        <button onClick={() => this.applyTransform(FlipY)}>Flip Y</button>
                    </div>
                </div>
    }
}
export default Tester;