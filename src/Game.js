import React, { Component } from 'react';
import { Patches } from './Data';
import { shuffle, RandomInt } from './utils';
import PatchesBoard from './UI/PatchesBoard';
import PlayerBoard from './UI/PlayerBoard';
import PlayerStats from './UI/PlayerStats';
import TimeBoard from './UI/TimeBoard';
class Game extends Component {
    constructor(props) {
        super(props);
        const players = [{ "name": "p1", "position": 0, "money": 5, "pieces": 0 }, { "name": "p2", "position": 0, "money": 5, "pieces": 0 }];
        this.state = {
            patchList: this.generatePatchList(),
            players: players,
            activePlayer: players[RandomInt(2)]
        }
    }
    generatePatchList = () => {
        const initialPatch = Patches.find(p => p.initial);
        let otherPatches = Patches.filter(p => !p.initial);
        otherPatches = shuffle(otherPatches);
        return otherPatches.concat(initialPatch);
    }
    handleAction = (patch = null) => {
        let players = this.state.players.slice();
        const activePlayer = players.find(p => p.name === this.state.activePlayer.name);
        const otherPlayer = players.find(p => p.name !== activePlayer.name);
        if (patch !== null) {   // COMPRA
            const patchList = this.state.patchList;
            // TODO: check enough money
            activePlayer.money -= patch.cost.money;
            activePlayer.position += patch.cost.time;
            activePlayer.pieces++;
            let pi = patchList.findIndex(p => p.id === patch.id);
            // hacer algo con pi
            this.setState({
                patchList: patchList.slice(pi + 1).concat(patchList.slice(0, pi))
            });
        } else {                // PASS
            const advance = otherPlayer.position - activePlayer.position + 1;
            activePlayer.position += advance;
            activePlayer.money += advance;
        }
        this.setState({
            players: players,
            activePlayer: (activePlayer.position <= otherPlayer.position) ? activePlayer : otherPlayer
        });
    }
    handleBuyPatch = (patch) => {
        this.handleAction(patch);
    }
    render = () => {
        return (<div className="game">
            <div className="main">
                <PlayerStats activePlayer={this.state.activePlayer} players={this.state.players} />
                <PlayerBoard  />
                <button onClick={() => this.handleAction()}>PASS</button>
                <PatchesBoard patchList={this.state.patchList} onBuyPatch={this.handleBuyPatch} />
            </div>
            <TimeBoard players={this.state.players} />
        </div>);
    }
}
export default Game;