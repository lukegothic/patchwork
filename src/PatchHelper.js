import { MaxReducer } from './Reducers';
export const getDimensions = (patch) => ({
    h: patch.vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1,
    w: patch.vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1
});