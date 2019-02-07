import React, { Component } from 'react';
import { BlockSize } from '../Const';
class PatchPlacerTile extends Component {
    onDragEnter = (e) => {
        console.log(e, "onDragEnter");
        this.setState(state => ({ over: true }));
    }
    onDragLeave = (e) => {
        console.log(e, "onDragLeave");
        this.setState(state => ({ over: false }));
    }
    onDrop = (e) => {
        console.log(e, "onDrop");
        this.setState(state => ({ over: false }));
        this.state.placeHandler();
    }
    onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    constructor(props) {
        super(props);
        this.state = {
            over: false,
            tile: props.tile,
            placeHandler: props.onPlacePatch
        }
    }
    render = () => {
        return <div className={`tile${this.state.over ? " dragover" : ""}`} onDrop={this.onDrop} onDragOver={this.onDragOver} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} style={{ "width": BlockSize, "height": BlockSize, "left": this.state.tile[0]*BlockSize, "top": this.state.tile[1]*BlockSize}} ></div>;
    }
}

export default PatchPlacerTile;
