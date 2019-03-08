import React, { Component } from 'react';
import Timeline from './UI/Timeline';
import Player from './UI/Player';
import Market from './UI/Market';
import Editor from './UI/Editor';
import EndGame from './UI/EndGame';

import { BonusTile, LeapLength, BasePlayers, BaseTimeline, BaseBonuses, BasePatches } from './const';
import * as BoardHelper from './utils/BoardHelper';
import { shuffle, clamp } from './utils';

import './game.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = this.getNewGame();
        // TODO: Configuracion
        this.cfg = {
            timeline:{
                "size": BaseTimeline.size    // longitud de la partida, en casillas
            },
            playerboard: {                   // ancho y alto del tablero del jugador
                "size": [9, 9]
            }
        }
    }
    // SETUP
    generatePlayers = (players) => {
        const startingPlayer = shuffle(players)[0];
        return players.map((name, i) => ({ 
            "id": `p${i}`,
            "name": name,
            "position": 0,
            "position_before": null,
            "money": 5,
            "finishPosition": null,
            "bonuses": [],
            "patches": [],
            "playing": name === startingPlayer
        }));
    }
    generatePatchList = (patches) => {
        const initialPatch = patches.find(p => p.initial);
        let otherPatches = patches.filter(p => !p.initial);
        otherPatches = shuffle(otherPatches);
        return otherPatches.concat(initialPatch);
    }
    generateBonuses = (bonuses) => {
        return bonuses.slice();
    }
    generateCheckpoints = (timeline) => {
        return timeline.checkpoints.map((cp, i) => Object.assign({ "id": `chk${i}` }, cp))
    }
getNewGame = () => ({                                           // TODO: Por Config else Base
        players: this.generatePlayers(BasePlayers),             // players 
        patchList: this.generatePatchList(BasePatches),         // market patches
        checkpoints: this.generateCheckpoints(BaseTimeline),    // timeline checkpoints
        bonuses: this.generateBonuses(BaseBonuses),             // timeline bonuses
        patchIntent: null,                                      // patch to be placed
        patchDragging: false                                    // is player placing a patch
    })
    // UTILS
    getPlayers = (players) => {
        return {
            "active": players.find(p => p.playing),
            "other": players.find(p => !p.playing),
        }
    }
    getCheckPoints = (checkpoints, from, to) => (from !== to) && checkpoints.filter(cp => cp.position > from && cp.position <= to && cp.pickedup !== true);
    getPlayerAdvanceOnPass = (players = this.state.players) => {
        const distance = Math.abs(players[0].position - players[1].position);
        const mod = players.find(p => p.finishPosition !== null) ? 0 : LeapLength; 
        return distance + mod;
    }
    getListWithoutPatch = (patch, patchList) => patchList.filter(p => p.id !== patch.id);
    isLegalPlacement = (player, patch, at) => {
        const patchVertex = patch.vertex.map(v => [v[0] + at[0], v[1] + at[1]]);
        return patchVertex.every(v => v[0] >= 0 && v[0] < this.cfg.playerboard.size[0] && v[1] >= 0 && v[1] < this.cfg.playerboard.size[1] && !BoardHelper.getPlayerTiles(player).some(tile => BoardHelper.IsSameVertex(tile , v)));
    }
    isEndGame = () => {
        return this.state.players.reduce((acc, curr) => acc + curr.position, 0) === (this.cfg.timeline.size - 1) * this.state.players.length;
    }
    // GAME ACTIONS and HANDLERS
    performEndTurnActions = () => {
        this.setState(state => {
            let players = state.players.slice();
            let playersByStatus = this.getPlayers(players);
            let checkpoints = state.checkpoints.slice();
            let patchIntent = state.patchIntent;
            // 1. Si el jugador ha llegado al final, asignar primer llegador, si es el primero
            if (playersByStatus.active.position === this.cfg.timeline.size - 1) {
                playersByStatus.active.finishPosition = players.filter(p => p.finishPosition !== null).length + 1;
            }
            // 2. Determinar si ha pasado por algun chkpoint
            const mycheckpoints = this.getCheckPoints(checkpoints, playersByStatus.active.position_before, playersByStatus.active.position);
            if (mycheckpoints.length > 0) {
                mycheckpoints.forEach(cp => {
                    switch(cp.type) {
                        case "money":
                            playersByStatus.active.money += playersByStatus.active.patches.reduce((acc, item) => acc + item.money, 0);
                        break;
                        case "patch":
                            cp.pickedup = true;
                            patchIntent = Object.assign({}, BonusTile, { "id": `bonus${cp.id}` });
                        break;
                        default:
                            // no hay default
                        break;
                    }
                });
            }
            // 3. Si el jugador ha cogido un patch de bonus, sigue siendo su turno
            if (patchIntent === null) {
                // 3a. Calcular nuevo player activo
                if (playersByStatus.active.position > playersByStatus.other.position) {
                    playersByStatus.active.playing = false;
                    playersByStatus.other.playing = true;
                }
            }
            return {
                players,
                checkpoints,
                patchIntent
            };
        });
    }
    handlePass = () => {
        this.setState(state => {
            let players = state.players.slice();
            let playersByStatus = this.getPlayers(players);
            playersByStatus.active.position_before = playersByStatus.active.position;
            const advance = this.getPlayerAdvanceOnPass(players);
            playersByStatus.active.position += advance;
            playersByStatus.active.money += advance;
            return {
                players
            }
        }, this.performEndTurnActions);
    }
    handleBuyPatchIntent = (patch) => {
        if (patch) {
            this.setState(state => {
                let playersByStatus = this.getPlayers(state.players);
                if (patch.cost.money <= playersByStatus.active.money) {
                    return {
                        patchIntent: patch
                    };
                } else {
                    alert("No tienes suficiente dinero, escoge otra pieza o pulsa 'DESCANSAR'");
                }
            });
        } else {
            this.handlePass();
        }
    }
    handleReturnPatch = () => this.setState(() => ({ patchIntent: null }));
    handlePlacePatch = (at) => {
        this.setState(state => {
            let players = state.players.slice();
            let playersByStatus = this.getPlayers(players);
            if (at === null || this.isLegalPlacement(playersByStatus.active, state.patchIntent, at)) {
                let bonuses = state.bonuses.slice();
                // at es null cuando se ha pulsado en descartar la pieza, por lo que no se anade a la coleccion del jugador
                if (at !== null) {
                    playersByStatus.active.patches.push(Object.assign(this.state.patchIntent, { "at": at }));
                    // Comprobar si se ha obtenido uno de los bonus disponibles
                    state.bonuses.forEach(b => {
                        if (BoardHelper.hasCoveredZone(playersByStatus.active, this.cfg.playerboard.size, b.size)) {
                            playersByStatus.active.bonuses.push(bonuses.splice(bonuses.findIndex(bx => bx.id === b.id), 1)[0]);
                        }
                    });
                }
                playersByStatus.active.position_before = playersByStatus.active.position;
                playersByStatus.active.position = clamp(playersByStatus.active.position + state.patchIntent.cost.time, this.cfg.timeline.size - 1);
                playersByStatus.active.money -= state.patchIntent.cost.money;                
                return {
                    players,
                    bonuses,
                    patchIntent: null,
                    patchList: this.getListWithoutPatch(state.patchIntent, state.patchList)
                };
            } else {
                // TODO: toast
                console.log("Not legal");
            }
        }, this.performEndTurnActions);       
    }
    // PATCH EDITOR
    handleDragStart = () => {
        this.setState(() => ({ patchDragging: true }));
    }
    handleDragEnd = () => {
        this.setState(() => ({ patchDragging: false }));
    }
    handleRestart = () => {
        this.setState(() => this.getNewGame());
    }
    render = () => {
        return (
            this.isEndGame()
                ? <EndGame players={this.state.players} size={this.cfg.playerboard.size} onRestart={this.handleRestart} />
                : <div className="game">
                    <Timeline players={this.state.players} checkpoints={this.state.checkpoints} size={this.cfg.timeline.size} patchIntent={this.state.patchIntent} />
                    <div className={`players ${this.state.players.find(p => p.playing).id}`}>
                    { this.state.players.map((player) =>
                        <Player key={player.id} size={this.cfg.playerboard.size} player={player} patch={this.state.patchDragging && this.state.patchIntent} onPlacePatch={this.handlePlacePatch} />) }
                    </div>
                    { this.state.patchIntent !== null
                        ? <Editor patch={this.state.patchIntent} onEdit={this.handleBuyPatchIntent} onCancel={this.handleReturnPatch} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDiscard={() => this.handlePlacePatch(null)} />
                        : <Market playerAdvance={this.getPlayerAdvanceOnPass()} playerMoney={this.state.players.find(p => p.playing).money} patches={this.state.patchList} onBuyPatch={this.handleBuyPatchIntent} />
                    }
                    </div>
       );
    }
}
export default Game;