import { Map, MapElement } from "../engine/map";

const F = MapElement.F;
const W = MapElement.W;

export const Maps: { [name:string]: Map } = {
    land1: {
        dimension: {
            width: 20,
            height: 5
        },
        data: [
            [ F, F, F, F, F, F, F, F, F, F, F, F, W, F, W, F, F, F, F, F ],
            [ F, F, F, F, F, W, W, F, F, F, F, F, F, F, F, F, F, F, F, F ],
            [ F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F ],
            [ F, F, F, F, F, F, F, F, W, W, W, F, F, F, F, F, F, F, F, F ],
            [ F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W, W, F ],
        ]
    }
};