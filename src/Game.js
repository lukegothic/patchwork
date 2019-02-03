import React, { Component } from 'react';
import { Patches } from './Data';
import { shuffle, RandomInt, clamp } from './utils';
import Market from './UI/Market';
import PlayerBoard from './UI/PlayerBoard';
import TimeBoard from './UI/TimeBoard';
import EndGame from './UI/EndGame';
import * as BoardHelper from './BoardHelper';
import { TimeBoardBaseLayout } from './Data';
import './patrones.css';
class Game extends Component {
    constructor(props) {
        super(props);
        const players = ["p1", "p2"].map((name, i) => ({ 
            "id": i,
            "name": name,
            "position": 0,
            "money": 5,
            "first7x7": false,
            "patches": []
        }));
        this.state = {
            patchList: this.generatePatchList(),
            players: shuffle(players),
            patchIntent: null,
            checkpoints: TimeBoardBaseLayout.checkpoints.map((cp, i) => Object.assign({ "id": `cp${i}` }, cp)),
            // lo siguiente es cfg
            timeboard: {
                "size": TimeBoardBaseLayout.size
            },
            playerboard: {
                "size": {
                    "w": 9,
                    "h": 9
                }
            }            
        }
    }
    generatePatchList = () => {
        const initialPatch = Patches.find(p => p.initial);
        let otherPatches = Patches.filter(p => !p.initial);
        otherPatches = shuffle(otherPatches);
        return otherPatches.concat(initialPatch);
    }
    getCheckPoint = (from, to) => (from !== to) && this.state.checkpoints.find(cp => cp.position > from && cp.position <= to && cp.pickedup !== true);
    performEndTurnActions = (startingPosition) => {
        this.setState(state => {
            // 1. Determinar si ha pasado por un chkpoint
            const checkpoint = this.getCheckPoint(startingPosition, state.players[0].position);
            console.log(checkpoint);
            if (checkpoint) {
                switch(checkpoint.type) {
                    case "money":
                        // give money
                    break;
                    case "patch":
                        let cps = state.checkpoints.slice();
                        let cp = cps.find(cp => cp.id === checkpoint.id);
                        cp.pickedup = true;
                        // AKI PETA, hacerlo de otra manera
                        /*this.setState({ 
                            patchIntent: { "id": checkpoint.id, "money": 0, "cost": { "money": 0, "time": 0 }, "vertex": [[0,0]] },
                            checkpoints: cps
                        });*/
                    break;
                }
            }
            if (!checkpoint || checkpoint.type !== "patch") {
                // 2. Calcular nuevo player activo
                if (state.players[1].position < state.players[0].position) {
                    let players = state.players.slice();
                    return {
                        players: [players[1], players[0]]
                    }
                }
            }
            // 3. Detectar fin de juego (es necesario o se saca de los players???)
        });
    }
    handlePass = () => {
        let startingPosition;
        this.setState(state => {
            let activePlayer = Object.assign({}, state.players[0]);
            const otherPlayer = Object.assign({}, state.players[1]);
            startingPosition = activePlayer.position;
            const advance = otherPlayer.position - startingPosition + 1;
            activePlayer.position += advance;
            //activePlayer.position = clamp(activePlayer.position, state.timeboard.size - 1);
            activePlayer.money += advance;
            return {
                players: [activePlayer, otherPlayer]
            }
        }, () => this.performEndTurnActions(startingPosition));
    }
    handleBuyPatchIntent = (patch) => {
        if (patch.cost.money <= this.state.players[0].money) {
            this.setState({ patchIntent: patch });
        } else {
            alert("No tienes suficiente dinero, escoge otra pieza o pulsa 'AVANZAR'");
        }
    }
    handleReturnPatch = () => this.setState(state => ({ patchToBePlaced: null }));
    handleAction = (patch = null) => {
        let players = this.state.players.slice();
        const activePlayer = players[0];
        const otherPlayer = players[1];
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
            const pi = patchList.findIndex(p => p.id === patch.id);
            //activePlayer.patches.push(Object.assign({}, patchList[pi]));
            const newPatch = Object.assign({}, patchList[pi]);
            this.setState({
                patchList: patchList.slice(pi + 1).concat(patchList.slice(0, pi)),
                patchToBePlaced: newPatch
            });
        } else {                // PASS
            const advance = otherPlayer.position - activePlayer.position + 1;
            activePlayer.position += advance;
            activePlayer.money += advance;
        }
        // TODO: eliminar y terminar de pasar este codigo al otro lado
        // comprobar si ha pasado por un checkpoint y aplicar acción, si es una acción de tipo "recaudar", aumentar dinero por botones actuiales, si es un parche, inmediatamente lanzar el colocar el parche.
        /*
        let timeboard = Object.assign(this.state.checkpoints, {});
        activePlayer.position = clamp(activePlayer.position, timeboard.size - 1);
        const checkpoint = timeboard.find(cp => cp.position > oldPosition && cp.position <= activePlayer.position && cp.pickedup !== true);
        if (checkpoint) {
            if (checkpoint.type === "patch") {
                checkpoint.pickedup = false;
                this.setState({
                    timeboard: timeboard
                });
            } else if (checkpoint.type === "money") {
                activePlayer.money += activePlayer.patches.reduce((acc, item) => acc + item.money, 0)
            }
        }
        // TODO: detectar FIN de juego
        this.setState({
            players: players,
            activePlayer: (activePlayer.position <= otherPlayer.position) ? activePlayer : otherPlayer
        });
        */
    }
    isLegalPlacement = (player, patch, at) => {
        const patchVertex = patch.vertex.map(v => [v[0] + at[0], v[1] + at[1]]);
        return patchVertex.every(v => v[0] >= 0 && v[0] < this.state.playerboard.size.w && v[1] >= 0 && v[1] < this.state.playerboard.size.h && !BoardHelper.getUsedTiles(player).find(tile => tile[0] === v[0] && tile[1] === v[1]));
    }
    handlePlacePatch = (at) => {
        let startingPosition;
        this.setState(state => {
            let activePlayer = Object.assign({}, state.players[0]);
            if (this.isLegalPlacement(activePlayer, state.patchIntent, at)) {
                startingPosition = activePlayer.position;
                activePlayer.patches.push(Object.assign(this.state.patchIntent, { "at": at }));
                activePlayer.position += state.patchIntent.cost.time;
                activePlayer.money -= state.patchIntent.cost.money;
                const patchToRemove = state.patchList.findIndex(p => p.id === state.patchIntent.id);
                return {
                    "players": [activePlayer, Object.assign({}, state.players[1])],
                    "patchIntent": null,
                    "patchList": state.patchList.slice(patchToRemove + 1).concat(state.patchList.slice(0, patchToRemove)),
                };
            } else {
                console.log("not legal");
            }
        }, () => this.performEndTurnActions(startingPosition));       
    }
    render = () => {
        return (<div className="game">
            {(this.state.players.reduce((acc, curr) => acc + curr.position, 0) === (this.state.timeboard.size - 1) * this.state.players.length) && <EndGame players={this.state.players} />}
            <div className="main">
                { this.state.players.map((player, i) => <PlayerBoard active={ i === 0 } size={this.state.playerboard.size} player={player} patch={this.state.patchIntent} onPlacePatch={this.handlePlacePatch} />) }
                <button onClick={() => this.handlePass()}>DESCANSAR</button>
                <Market playerMoney={this.state.players[0].money} patchList={this.state.patchList} onBuyPatch={this.handleBuyPatchIntent} />
            </div>
            <TimeBoard players={this.state.players} />
        </div>);
    }
}
export default Game;