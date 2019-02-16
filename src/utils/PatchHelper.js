import { MaxReducer } from './Reducers';
export const getDimensions = (patch) => [
    patch.vertex.map(v => v[0]).reduce(MaxReducer, 0) + 1,
    patch.vertex.map(v => v[1]).reduce(MaxReducer, 0) + 1    
];