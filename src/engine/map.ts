import { Dimension } from "./dimension";

export enum MapElement {
    F,
    W,
}

export interface Map {
    dimension: Dimension
    data: MapElement[][]
}