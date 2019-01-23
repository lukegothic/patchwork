import React, { Component } from 'react';
import { Patches } from './Data';
import { shuffle } from './utils';
import PatchesBoard from './UI/PatchesBoard';
import TimeBoard from './UI/TimeBoard';
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patchList: this.generatePatchList()
        }
    }
    generatePatchList = () => {
        const initialPatch = Patches.find(p => p.initial);
        let otherPatches = Patches.filter(p => !p.initial);
        otherPatches = shuffle(otherPatches);
        return otherPatches.concat(initialPatch);
    }
    handleBuyPatch = (patch) => {
        const patchList = this.state.patchList;
        let pi = patchList.findIndex(p => p.id === patch.id);
        this.setState({
            patchList: patchList.slice(pi + 1).concat(patchList.slice(0, pi))
        });
    }
    render = () => {
        return (<div className="game">
            <PatchesBoard patchList={this.state.patchList} onBuyPatch={this.handleBuyPatch} />
            <TimeBoard />
        </div>);
    }
}
export default Game;