import React from 'react';
import Patch from './Patch';
import { MinReducer } from '../Reducers';
const RotateCW = v => [-1 * v[1], v[0]];
const RotateCCW = v => [v[1], -1 * v[0]];
const FlipX = v => [v[0], -1 * v[1]];
const FlipY = v => [-1 * v[0], v[1]];
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
const applyTransform = (patch, transformFn) => {
    patch.vertex = MoveToOrigin(patch.vertex.map(transformFn));
    return patch;
}
const PatchEditor = ({ patch, onEdit, onCancel }) => {
    return <div className="patchEditor">
        <Patch patch={patch}></Patch>
        {!/^bonus.*/.test(patch.id) && 
        <div class="editcontrols">
            <button onClick={() => onEdit(applyTransform(patch, FlipX))}>FlipX</button>
            <button onClick={() => onEdit(applyTransform(patch, RotateCCW))}>CCW</button>
            <button onClick={() => onEdit(applyTransform(patch, RotateCW))}>CW</button>
            <button onClick={() => onEdit(applyTransform(patch, FlipY))}>FlipY</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
        }        
    </div>
}
export default PatchEditor;