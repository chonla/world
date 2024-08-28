import { Coordinate } from "./coordination";
import { SpriteOptions } from "./sprite-options";

export class Sprite {
    private _options: SpriteOptions;
    private _img: HTMLImageElement;

    constructor(options: SpriteOptions) {
        this._options = options;
        this._img = new Image();
        this._img.src = options.imageUrl;
    }

    draw(context: CanvasRenderingContext2D, pos: Coordinate) {
        context.drawImage(this._img, pos.x, pos.y, this._options.size, this._options.size);
    }
}