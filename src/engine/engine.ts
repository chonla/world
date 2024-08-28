import { Maps } from "../resources/map";
import { EngineOptions } from "./engine-options";
import { Player } from "./player";
import { PlayerOptions } from "./player-options";
import { World } from "./world";
import { WorldOptions } from "./world-options";

export class Engine {
    private _options: EngineOptions;

    constructor(options: EngineOptions) {
        this._options = options;
    }

    initialize() {
        const worldOptions: WorldOptions = {
            logger: this._options.logger,
            canvasId: 'world-canvas',
            playerImageSource: './assets/player.png',
            landImageSource: './assets/grass.png',
            tileSize: 24,
            viewPort: { x: 0, y: 0, width: 15, height: 3},
            map: Maps.land1,
            width: document.body.clientWidth
        };
        const world = new World(worldOptions);

        const playerOptions: PlayerOptions = {
            logger: this._options.logger
        };
        const player = new Player({x: 0, y: 0}, playerOptions);
        world.addPlayer(player);

        world.subscribeToKeyboardControl();

        world.draw();
    }
}