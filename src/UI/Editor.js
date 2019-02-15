import React from 'react';
import Patch from './Patch';
import { MinReducer } from '../utils/Reducers';
import './editor.css';
const RotateCW = v => [-1 * v[1], v[0]];
const RotateCCW = v => [v[1], -1 * v[0]];
const FlipX = v => [v[0], -1 * v[1]];
const FlipY = v => [-1 * v[0], v[1]];
const MoveToOrigin = (vertices) => { // mover la pieza a las coordenadas (0,0)
    // determinar desviacion eje x
    const minx = vertices.map(v => v[0]).reduce(MinReducer, 0);
    // determinar desviacion eje y
    const miny = vertices.map(v => v[1]).reduce(MinReducer, 0);
    // construir vector corrector de desviacion
    const normV = [Math.abs(minx), Math.abs(miny)];
    // calcular vectores normalizados
    return vertices.map(v => [v[0]+normV[0], v[1]+normV[1]]);
}
const applyTransform = (patch, transformFn) => {
    patch.vertex = MoveToOrigin(patch.vertex.map(transformFn));
    return patch;
}
const Editor = ({ patch, onEdit, onCancel, onDiscard, onDragStart, onDragEnd }) => {
    return <div className="editor">
        <div className="patchIntent" draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Patch patch={patch}></Patch>
        </div>
        {!/^bonus.*/.test(patch.id) && 
        <div className="editcontrols">
            <button onClick={() => onEdit(applyTransform(patch, FlipX))}><i className="fa fa-arrows-alt-v fa-mirror-vertical" /></button>
            <button onClick={() => onEdit(applyTransform(patch, RotateCCW))}><i className="fa fa-undo fa-spin-reverse" /></button>
            <button onClick={() => onEdit(applyTransform(patch, RotateCW))}><i className="fa fa-redo fa-spin" /></button>
            <button onClick={() => onEdit(applyTransform(patch, FlipY))}><i className="fa fa-arrows-alt-h fa-mirror-horizontal" /></button>
            <button onClick={onCancel}><i className="fa fa-ban" /></button>
            <button onClick={onDiscard}><i className="fa fa-trash" /></button>
        </div>
        }        
    </div>
}
export default Editor;