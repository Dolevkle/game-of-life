export interface GridSize {
    rows: number;
    cols: number;
}

export type Grid = boolean[][];

export interface Pattern {
    name: string;
    cells: [number, number][];
    width: number;
    height: number;
}