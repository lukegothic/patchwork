// TODO: conseguir llamar desde Move a MoveVertex
export const MoveVertex = (vertex, desv) => [vertex[0] + desv[0], vertex[1] + desv[1]];
export const Move = (vertex, desv) => vertex.map(v => [v[0] + desv[0], v[1] + desv[1]] );