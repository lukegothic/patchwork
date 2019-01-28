import React, { Component } from 'react';
import { Patches } from './Data';
import { shuffle, RandomInt, clamp } from './utils';
import PatchesBoard from './UI/PatchesBoard';
import PlayerBoard from './UI/PlayerBoard';
import PlayerStats from './UI/PlayerStats';
import TimeBoard from './UI/TimeBoard';
import { TimeBoardBaseLayout } from './Data';
import './patrones.css';
class Game extends Component {
    constructor(props) {
        super(props);
        const players = [{ "name": "p1", "position": 0, "money": 5, "pieces": [] }, { "name": "p2", "position": 0, "money": 5, "pieces": [] }];
        this.state = {
            patchList: this.generatePatchList(),
            players: players,
            activePlayer: players[RandomInt(2)],
            timeboard: {
                "size": TimeBoardBaseLayout.size,
                "checkpoints": TimeBoardBaseLayout.checkpoints.slice()
            }
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
        // detectar accion ilegal
        if (patch !== null && patch.cost.money > activePlayer.money) {
            alert("No tienes suficiente dinero, escoge otra pieza o pulsa 'AVANZAR'");
            return;
        }
        const oldPosition = activePlayer.position; 
        if (patch !== null) {   // COMPRA
            const patchList = this.state.patchList;
            activePlayer.money -= patch.cost.money;
            activePlayer.position += patch.cost.time;
            let pi = patchList.findIndex(p => p.id === patch.id);
            activePlayer.pieces.push(Object.assign({}, patchList[pi]));
            this.setState({
                patchList: patchList.slice(pi + 1).concat(patchList.slice(0, pi))
            });
        } else {                // PASS
            const advance = otherPlayer.position - activePlayer.position + 1;
            activePlayer.position += advance;
            activePlayer.money += advance;
        }
        // comprobar si ha pasado por un checkpoint y aplicar acción, si es una acción de tipo "recaudar", aumentar dinero por botones actuiales, si es un parche, inmediatamente lanzar el colocar el parche.
        let timeboard = Object.assign(this.state.timeboard, {});
        activePlayer.position = clamp(activePlayer.position, timeboard.size - 1);
        const checkpoint = timeboard.checkpoints.find(cp => cp.position > oldPosition && cp.position <= activePlayer.position && cp.pickedup !== true);
        if (checkpoint) {
            if (checkpoint.type === "patch") {
                checkpoint.pickedup = false;
                this.setState({
                    timeboard: timeboard
                });
            } else if (checkpoint.type === "money") {
                activePlayer.money += activePlayer.pieces.reduce((acc, item) => acc + item.money, 0)
            }
        }
        // TODO: detectar FIN de juego
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
                <button onClick={() => this.handleAction()}>DESCANSAR</button>
                <PatchesBoard playerMoney={this.state.activePlayer.money} patchList={this.state.patchList} onBuyPatch={this.handleBuyPatch} />
            </div>
            <TimeBoard players={this.state.players} />
        </div>);
    }
}
export default Game;