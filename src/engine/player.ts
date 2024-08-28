import { Coordinate } from "./coordination";
import { PlayerOptions } from "./player-options";

export class Player {
    private _position: Coordinate;
    private _options: PlayerOptions;

    constructor(origin: Coordinate, options: PlayerOptions) {
        this._position = origin;
        this._options = options;
    }

    position(): Coordinate {
        return { x: this._position.x, y: this._position.y };
    }

    moveUp() {
        this._position.y--;
    }

    moveDown() {
        this._position.y++;
    }

    moveLeft() {
        this._position.x--;
    }

    moveRight() {
        this._position.x++;
    }
}