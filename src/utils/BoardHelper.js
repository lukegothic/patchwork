import { Range } from '../utils';
export const MoveVertex = (vertex, desv) => [vertex[0] + desv[0], vertex[1] + desv[1]];
export const MoveVertices = (vertex, desv) => vertex.map(v => MoveVertex(v, desv) );
export const MovePatch = (patch) => Object.assign({}, patch, { "vertex": MoveVertices(patch.vertex, patch.at)});
export const IsSameVertex = (v1, v2) => v1[0] === v2[0] && v1[1] === v2[1];
export const getAllTiles = (size) => Range(0, size[0] - 1).reduce((acc, col) => acc.concat(Range(0, size[1] - 1).reduce((acc2, row) => acc2.concat([[col, row]]), [])), []);
export const getPlayerTiles = (player) => player.patches.reduce((acc, patch) => acc.concat(MovePatch(patch).vertex), []);
export const getFreeTiles = (player, size) => {
    const playersTiles = getPlayerTiles(player);
    return getAllTiles(size).filter(tile => !playersTiles.find(usedT => IsSameVertex(tile, usedT)));
}
export const divideBoard = (size, divisionSize) => {
    const baseBoard = getAllTiles(divisionSize);
    const deviation_w = Range(0, size[0] - divisionSize[0]);
    const deviation_h = Range(0, size[1] - divisionSize[1]);
    let deviations = [];
    deviation_w.forEach(dw => deviation_h.forEach(dh => deviations.push([dw, dh])));
    return deviations.map(dev => MoveVertices(baseBoard, dev));
}
export const hasCoveredZone = (player, size, zoneSize) => {
    const playersTiles = getPlayerTiles(player);
    const dividedBoard = divideBoard(size, zoneSize);
    const area = zoneSize[0] * zoneSize[1];
    return dividedBoard.some(board => {
        return board.filter(tile => {
            return playersTiles.find(usedT => IsSameVertex(tile, usedT));
        }).length === area;
    });
}