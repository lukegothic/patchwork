export const BlockSize = 40;
export const BonusTile = {
    "money": 0,
    "cost": { "money": 0, "time": 0 },
    "vertex": [[0,0]],
    "fill": "pBonus"
}
export const LeapLength = 1;
export const BasePlayers = ["Luke", "Porosita"];
export const BaseTimeline = {
    "size": 54,
    "checkpoints": [
        { "type": "money", "position": 5 },
        { "type": "money", "position": 11 },
        { "type": "money", "position": 17 },
        { "type": "patch", "position": 20 },
        { "type": "money", "position": 23 },
        { "type": "patch", "position": 26 },
        { "type": "money", "position": 29 },
        { "type": "patch", "position": 32 },
        { "type": "money", "position": 35 },
        { "type": "money", "position": 41 },
        { "type": "patch", "position": 44 },
        { "type": "money", "position": 47 },
        { "type": "patch", "position": 50 },
        { "type": "money", "position": 53 }
    ]
};
export const BaseBonuses = [
    { "id": "7_7_7", size: { "w": 7, "h": 7 }, points: 7 }
];
export const BasePatches = [
    /* p1 */
    { "id":  1, "money": 0, "cost": { "money":  3, "time": 1 }, "fill": "p01", "vertex": [[0,0],[1,0],[0,1]], "shape": [[true,true], [true,false]] },
    { "id":  2, "money": 1, "cost": { "money":  2, "time": 3 }, "fill": "p02", "vertex": [[1,0],[0,1],[1,1],[0,2],[0,3]], "shape": [[false,true],[true,true],[true,false],[true,false]] },
    { "id":  3, "money": 0, "cost": { "money":  1, "time": 2 }, "fill": "p03", "vertex": [[0,0],[1,0],[1,1],[1,2],[1,3],[2,3]], "shape": [[true,true,false],[false,true,false],[false,true,false],[false,true,true]] },
    { "id":  4, "money": 1, "cost": { "money":  7, "time": 1 }, "fill": "p04", "vertex": [[0,0],[1,0],[2,0],[3,0],[4,0]], "shape": [[true,true,true,true,true]] },
    { "id":  5, "money": 0, "cost": { "money":  2, "time": 2 }, "fill": "p05", "vertex": [[0,0],[1,0],[2,0]], "shape": [[true,true,true]] },
    { "id":  6, "money": 1, "cost": { "money":  1, "time": 4 }, "fill": "p06", "vertex": [[1,0],[1,1],[0,2],[1,2],[2,2],[1,3],[1,4]], "shape": [[false,true,false],[false,true,false],[true,true,true],[false,true,false],[false,true,false]] },
    { "id":  7, "money": 2, "cost": { "money":  6, "time": 5 }, "fill": "p07", "vertex": [[0,0],[1,0],[0,1],[1,1]], "shape": [[true,true],[true,true]] },
    { "id":  8, "money": 1, "cost": { "money":  1, "time": 5 }, "fill": "p08", "vertex": [[0,0],[1,0],[1,1],[1,2],[0,3],[1,3]], "shape": [[true,true],[false,true],[false,true],[true,true]] },
    /* p2 */
    { "id":  9, "money": 1, "cost": { "money":  3, "time": 4 }, "fill": "p09", "vertex": [[0,0],[0,1],[0,2],[1,2],[0,3]], "shape": [[true,false],[true,false],[true,true],[true,false]] },
    { "id": 10, "money": 0, "cost": { "money":  4, "time": 2 }, "fill": "p10", "vertex": [[0,0],[0,1],[1,1],[0,2],[1,2],[1,3]], "shape": [[true,false],[true,true],[true,true],[false,true]] },
    { "id": 11, "money": 0, "cost": { "money":  2, "time": 2 }, "fill": "p11", "vertex": [[0,0],[1,0],[2,0],[1,1]], "shape": [[true,true,true],[false,true,false]] },
    { "id": 12, "money": 1, "cost": { "money":  5, "time": 3 }, "fill": "p12", "vertex": [[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[1,2],[2,2]], "shape": [[false,true,true,false],[true,true,true,true],[false,true,true,false]] },
    { "id": 13, "money": 0, "cost": { "money":  1, "time": 3 }, "fill": "p13", "vertex": [[0,0],[1,0],[1,1]], "shape": [[true,true], [false,true]] },
    { "id": 14, "money": 3, "cost": { "money": 10, "time": 4 }, "fill": "p14", "vertex": [[0,0],[0,1],[1,1],[1,2],[2,2]], "shape": [[true,false,false],[true,true,false],[false,true,true]] },
    { "id": 15, "money": 2, "cost": { "money":  3, "time": 6 }, "fill": "p15", "vertex": [[1,0],[2,0],[0,1],[1,1],[1,2],[2,2]], "shape": [[false,true,true],[true,true,false],[false,true,true]] },
    { "id": 16, "money": 0, "cost": { "money":  2, "time": 1 }, "fill": "p16", "vertex": [[0,0],[1,0]], "shape": [[true,true]], "initial": true },
    /* p3 */
    { "id": 17, "money": 2, "cost": { "money":  7, "time": 4 }, "fill": "p17", "vertex": [[1,0],[2,0],[0,1],[1,1],[2,1],[3,1]], "shape": [[false,true,true,false],[true,true,true,true]] },
    { "id": 18, "money": 1, "cost": { "money":  4, "time": 2 }, "fill": "p18", "vertex": [[0,0],[1,0],[2,0],[0,1]], "shape": [[true,true,true],[true,false,false]] },
    { "id": 19, "money": 0, "cost": { "money":  1, "time": 2 }, "fill": "p19", "vertex": [[0,0],[1,0],[0,1],[0,2],[1,2]], "shape": [[true,true],[true,false],[true,true]] },
    { "id": 20, "money": 2, "cost": { "money":  4, "time": 6 }, "fill": "p20", "vertex": [[0,0],[0,1],[1,1],[2,1]], "shape": [[true,false,false],[true,true,true]] },
    { "id": 21, "money": 3, "cost": { "money":  8, "time": 6 }, "fill": "p21", "vertex": [[1,0],[2,0],[1,1],[2,1],[0,2],[1,2]], "shape": [[false,true,true],[false,true,true],[true,true,false]] },
    { "id": 22, "money": 2, "cost": { "money":  5, "time": 5 }, "fill": "p22", "vertex": [[2,0],[0,1],[1,1],[2,1],[2,2]], "shape": [[false,false,true],[true,true,true],[false,false,true]] },
    { "id": 23, "money": 0, "cost": { "money":  2, "time": 2 }, "fill": "p23", "vertex": [[1,0],[2,0],[0,1],[1,1],[2,1]], "shape": [[false,true,true],[true,true,true]] },
    { "id": 24, "money": 2, "cost": { "money": 10, "time": 3 }, "fill": "p24", "vertex": [[0,0],[1,0],[0,1],[0,2],[0,3]], "shape": [[true,true],[true,false],[true,false],[true,false]] },
    { "id": 25, "money": 1, "cost": { "money":  3, "time": 3 }, "fill": "p25", "vertex": [[0,0],[0,1],[0,2],[0,3]], "shape": [[true],[true],[true],[true]] },
    { "id": 26, "money": 3, "cost": { "money": 10, "time": 5 }, "fill": "p26", "vertex": [[0,0],[0,1],[0,2],[1,2],[0,3],[1,3]], "shape": [[true,false],[true,false],[true,true],[true,true]] },
    /* p4 */
    { "id": 27, "money": 2, "cost": { "money":  5, "time": 4 }, "fill": "p27", "vertex": [[1,0],[0,1],[1,1],[2,1],[1,2]], "shape": [[false,true,false],[true,true,true],[false,true,false]] },
    { "id": 28, "money": 1, "cost": { "money":  3, "time": 2 }, "fill": "p28", "vertex": [[0,0],[1,0],[1,1],[2,1]], "shape": [[true,true,false],[false,true,true]] },
    /* p5 */
    { "id": 29, "money": 0, "cost": { "money":  2, "time": 3 }, "fill": "p29", "vertex": [[0,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2]], "shape": [[true,false,true],[true,true,true],[true,false,true]] },
    { "id": 30, "money": 0, "cost": { "money":  2, "time": 1 }, "fill": "p30", "vertex": [[1,0],[1,1],[2,1],[0,2],[1,2],[1,3]], "shape": [[false,true,false],[false,true,true],[true,true,false],[false,true,false]] },
    { "id": 31, "money": 3, "cost": { "money":  7, "time": 6 }, "fill": "p31", "vertex": [[0,0],[0,1],[1,1],[1,2]], "shape": [[true,false],[true,true],[false,true]] },
    { "id": 32, "money": 0, "cost": { "money":  0, "time": 3 }, "fill": "p32", "vertex": [[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]], "shape": [[false,true,false,false],[true,true,true,true],[false,true,false,false]] },
    { "id": 33, "money": 2, "cost": { "money":  7, "time": 2 }, "fill": "p33", "vertex": [[1,0],[1,1],[1,2],[0,3],[1,3],[2,3]], "shape": [[false,true,false],[false,true,false],[false,true,false],[true,true,true]] }
];