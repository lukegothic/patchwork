import { Range } from './utils';
export const MoveVertex = (vertex, desv) => [vertex[0] + desv[0], vertex[1] + desv[1]];
export const MoveFigure = (vertex, desv) => vertex.map(v => MoveVertex(v, desv) );
export const getAllTiles = (size) => Range(0, size.w - 1).reduce((acc, col) => acc.concat(Range(0, size.h - 1).reduce((acc2, row) => acc2.concat([[col, row]]), [])), []);
export const getUsedTiles = (player) => player.patches.reduce((acc, item) => acc.concat(MoveFigure(item.vertex, item.at)), []);
export const getFreeTiles = (player, size) => getAllTiles(size).filter(tile => !getUsedTiles(player).find(usedT => usedT[0] === tile[0] && usedT[1] === tile[1]));