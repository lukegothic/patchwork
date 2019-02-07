import { Range } from './utils';
export const MoveVertex = (vertex, desv) => [vertex[0] + desv[0], vertex[1] + desv[1]];
export const MoveFigure = (vertex, desv) => vertex.map(v => MoveVertex(v, desv) );
export const IsSameVertex = (v1, v2) => v1[0] === v2[0] && v1[1] === v2[1];
export const getAllTiles = (size) => Range(0, size.w - 1).reduce((acc, col) => acc.concat(Range(0, size.h - 1).reduce((acc2, row) => acc2.concat([[col, row]]), [])), []);
export const getPlayerTiles = (player) => player.patches.reduce((acc, item) => acc.concat(MoveFigure(item.vertex, item.at)), []);
export const getFreeTiles = (player, size) => {
    const playersTiles = getPlayerTiles(player);
    return getAllTiles(size).filter(tile => !playersTiles.find(usedT => IsSameVertex(tile, usedT)));
}
export const divideBoard = (size, divisionSize) => {
    const baseBoard = getAllTiles(divisionSize);
    const deviation_w = Range(0, size.w - divisionSize.w);
    const deviation_h = Range(0, size.h - divisionSize.h);
    let deviations = [];
    deviation_w.forEach(dw => deviation_h.forEach(dh => deviations.push([dw, dh])));
    return deviations.map(dev => MoveFigure(baseBoard, dev));
}
export const hasCoveredZone = (player, size, zoneSize) => {
    const playersTiles = getPlayerTiles(player);
    const dividedBoard = divideBoard(size, zoneSize);
    const area = zoneSize.w * zoneSize.h;
    return dividedBoard.some(board => {
        return board.filter(tile => {
            return playersTiles.find(usedT => IsSameVertex(tile, usedT));
        }).length === area;
    });
}