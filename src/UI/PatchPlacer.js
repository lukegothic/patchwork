import React, { Component } from 'react';
import PatchPlacerTile from './PatchPlacerTile';
import * as BoardHelper from '../utils/BoardHelper';
import * as PatchHelper from '../utils/PatchHelper';
import { clamp } from '../utils';
import './patchplacer.css';
class PatchPlacer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intent: null,           // posicion en la que se va a colocar la pieza
        };
        this.patch = props.patch;   // pieza a colocar
        this.usedTiles = BoardHelper.getPlayerTiles(props.player);
        this.dropHandler = props.onPlacePatch;
        this.size = props.size;
        const patchSize = PatchHelper.getDimensions(this.patch);
        this.effectiveSize = {      // calcular el tablero en donde se puede soltar la pieza, viene dado por el tablero original menos el tamano de la pieza
            w: this.size.w - patchSize.w,
            h: this.size.h - patchSize.h
        };
    }
    handleHover = (tile) => {
        // calcular la posicion efectiva en la que se suelta la pieza, usando como limite el tablero efectivo
        this.setState(() => ({ intent: [clamp(tile[0], this.effectiveSize.w), clamp(tile[1], this.effectiveSize.h)] }));
    }
    handleDrop = () => {
        this.setState(state => {
            this.dropHandler(state.intent);
            return {
                intent: null
            }
        });
    }
    getMode = (tile) => {
        if (this.state.intent !== null) {
            let helperPatch = BoardHelper.MovePatch(Object.assign({}, this.patch, { "at": this.state.intent }));
            if (helperPatch.vertex.find(t => BoardHelper.IsSameVertex(t, tile))) {
                return this.usedTiles.some(t => BoardHelper.IsSameVertex(t, tile)) ? "invalid" : "valid";    
            } else {
                return "none";
            }
        } else {
            return "none";
        }
    }
    render = () => {
        return <div className="patchPlacer">{BoardHelper.getAllTiles(this.size).map(tile => <PatchPlacerTile key={`ppt${tile.join("_")}`} mode={this.getMode(tile)} tile={tile} onEnter={() => this.handleHover(tile)} onDrop={this.handleDrop} />)}</div>
    }
}
export default PatchPlacer;