import { Logger } from "../logger/logger";
import { Map } from "./map";
import { Rectangle } from "./rectangle";

export interface WorldOptions {
    logger: Logger;
    canvasId: string;
    playerImageSource: string;
    landImageSource: string;
    tileSize: number;
    viewPort: Rectangle;
    map: Map;
    width: number;
}