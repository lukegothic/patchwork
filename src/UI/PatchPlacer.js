import React, { Component } from 'react';
import PatchPlacerTile from './PatchPlacerTile';
import * as BoardHelper from '../BoardHelper';
import { MaxReducer } from '../Reducers';
class PatchPlacer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patch: props.patch, // pieza a colocar
            intent: null,       // posicion en la que se va a colocar la pieza
            usedTiles: BoardHelper.getPlayerTiles(props.player),
            dropHandler: props.onPlacePatch,
            size: props.size
        };
    }
    handleHover = (tile = null) => {
        this.setState(state => ({ intent: tile }));
    }
    handleDrop = (tile) => {
        this.setState(state => ({ intent: null }));
        this.state.dropHandler(tile);
    }
    // TODO: merge movetoorigin de PatchEditor y este
    moveToBoard = (fig, size) => {
        // determinar desviacion eje x
        const maxx = fig.map(v => v[0]).reduce(MaxReducer, 0);
        // determinar desviacion eje y
        const maxy = fig.map(v => v[1]).reduce(MaxReducer, 0);
        // construir vector corrector de desviacion
        const normV = [size.w-1-Math.max(maxx, size.w-1),size.h-1-Math.max(maxy, size.h-1)];
        // calcular vectores normalizados
        return fig.map(v => [v[0]+normV[0], v[1]+normV[1]]);
    }
    // TODO: solucionar 2 bugs:
    // 1. aunque parezca que s va a colocar bien el parche, si esta en los extremos salta que no es legal
    // 2. al salir del drag en el tablero, se queda la sombra de la ultima ayuda
    getMode = (tile) => {
        if (this.state.intent !== null) {
            let helperPatch = BoardHelper.MovePatch(Object.assign({}, this.state.patch, { "at": this.state.intent }));
            helperPatch = Object.assign(helperPatch, { "vertex": this.moveToBoard(helperPatch.vertex, this.state.size)})
            if (helperPatch.vertex.find(t => BoardHelper.IsSameVertex(t, tile))) {
                return this.state.usedTiles.some(t => BoardHelper.IsSameVertex(t, tile)) ? "invalid" : "valid";    
            } else {
                return "none";
            }            
        } else {
            return "none";
        }
    }
    render = () => {
        return <div className="patchPlacer">{BoardHelper.getAllTiles(this.state.size).map(tile => <PatchPlacerTile key={`pp${tile.join("_")}`} mode={this.getMode(tile)} tile={tile} onEnter={() => this.handleHover(tile)} onDrop={() => this.handleDrop(tile)} />)}</div>
              
    }
}
export default PatchPlacer;