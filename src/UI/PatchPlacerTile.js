import React from 'react';
import { BlockSize } from '../const';
const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
}
const PatchPlacerTile = ({ tile, mode, onEnter, onDrop }) => {
    return <div className={`tile ${mode}`} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onEnter} style={{ "width": BlockSize, "height": BlockSize, "left": tile[0]*BlockSize, "top": tile[1]*BlockSize}} ></div>;    
}
export default PatchPlacerTile;
