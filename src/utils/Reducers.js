export const MinReducer = (min, value) => min > value ? value : min;
export const MaxReducer = (max, value) => max < value ? value : max;