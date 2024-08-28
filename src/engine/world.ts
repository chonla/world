import { Coordinate } from "./coordination";
import { Direction } from "./direction";
import { MapElement } from "./map";
import { Player } from "./player";
import { Rectangle } from "./rectangle";
import { Sprite } from "./sprite";
import { WorldOptions } from "./world-options";

export class World {
    private _player: Player | null;
    private _options: WorldOptions;
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D | null;
    private _playerSprite: Sprite;
    private _landSprite: Sprite;
    private _activeViewPort: Rectangle;
    private _absolutePlayerPosition: Coordinate;
    private _canvasScale: number;
    private _tileSizeScale: number;

    constructor(options: WorldOptions) {
        // cache options
        this._options = options;

        this._player = null;

        this._canvas = document.getElementById(options.canvasId) as HTMLCanvasElement;
        const containerWidth = options.width;
        const canvasWidth = options.viewPort.width * options.tileSize;
        this._canvasScale = containerWidth / canvasWidth;
        this._canvas.width = options.viewPort.width * options.tileSize * this._canvasScale;
        this._canvas.height = options.viewPort.height * options.tileSize * this._canvasScale;
        this._context = this._canvas.getContext('2d');
        this._activeViewPort = { ...this._options.viewPort };
        this._tileSizeScale = options.tileSize * this._canvasScale;

        this._absolutePlayerPosition = { x: 2, y: 1 };

        this._playerSprite = new Sprite({
            logger: options.logger,
            imageUrl: options.playerImageSource,
            size: this._tileSizeScale,
        });
        this._landSprite = new Sprite({
            logger: options.logger,
            imageUrl: options.landImageSource,
            size: this._tileSizeScale,
        });
    }

    draw() {
        this._context.fillStyle = '#202020';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        // Draw map projected to viewport
        for (let y = 0; y < this._activeViewPort.height; y++) {
            for (let x = 0; x < this._activeViewPort.width; x++) {
                const mapCoordinate: Coordinate = {
                    x: x + this._activeViewPort.x,
                    y: y + this._activeViewPort.y,
                };
                switch (this._options.map.data[mapCoordinate.y][mapCoordinate.x]) {
                    case MapElement.F:
                        this._landSprite.draw(this._context, {
                            x: x * this._tileSizeScale,
                            y: y * this._tileSizeScale,
                        });
                        break;
                    case MapElement.W:
                        this._context.fillRect(x * this._tileSizeScale, y * this._tileSizeScale, this._tileSizeScale, this._tileSizeScale);
                        break;
                }
            }
        }

        // draw player
        this._playerSprite.draw(this._context, {
            x: (this._absolutePlayerPosition.x - this._activeViewPort.x) * this._tileSizeScale,
            y: (this._absolutePlayerPosition.y - this._activeViewPort.y) * this._tileSizeScale,
        });

        requestAnimationFrame(this.draw.bind(this));
    }

    movePlayer(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                if (this.canPlayerMoveUpward()) {
                    this._absolutePlayerPosition.y--;
                    if (this._absolutePlayerPosition.y <= this._options.map.dimension.height - this._activeViewPort.height / 2) {
                        if (this._activeViewPort.y > 0) {
                            this._activeViewPort.y--;
                        } else {
                            this._activeViewPort.y = 0;
                        }
                    }
                }
                break;
            case Direction.Down:
                if (this.canPlayerMoveDownward()) {
                    this._absolutePlayerPosition.y++;
                    if (this._absolutePlayerPosition.y >= this._activeViewPort.height / 2) {
                        if (this._activeViewPort.y + this._activeViewPort.height < this._options.map.dimension.height - 1) {
                            this._activeViewPort.y++;
                        } else {
                            this._activeViewPort.y = this._options.map.dimension.height - this._activeViewPort.height;
                        }
                    }
                }
                break;
            case Direction.Left:
                if (this.canPlayerMoveLeftward()) {
                    this._absolutePlayerPosition.x--;
                    if (this._absolutePlayerPosition.x <= this._options.map.dimension.width - this._activeViewPort.width / 2) {
                        if (this._activeViewPort.x > 0) {
                            this._activeViewPort.x--;
                        } else {
                            this._activeViewPort.x = 0;
                        }
                    }
                }
                break;
            case Direction.Right:
                if (this.canPlayerMoveRightward()) {
                    this._absolutePlayerPosition.x++;
                    if (this._absolutePlayerPosition.x >= this._activeViewPort.width / 2) {
                        if (this._activeViewPort.x + this._activeViewPort.width < this._options.map.dimension.width - 1) {
                            this._activeViewPort.x++;
                        } else {
                            this._activeViewPort.x = this._options.map.dimension.width - this._activeViewPort.width;
                        }
                    }
                }
                break;
        }
    }

    subscribeToKeyboardControl() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.movePlayer(Direction.Up);
                    break;
                case 'ArrowDown':
                    this.movePlayer(Direction.Down);
                    break;
                case 'ArrowLeft':
                    this.movePlayer(Direction.Left);
                    break;
                case 'ArrowRight':
                    this.movePlayer(Direction.Right);
                    break;
            }
        });
    }

    canPlayerMoveUpward(): boolean {
        const { x, y } = this._absolutePlayerPosition;
        if (y <= 0) {
            return false;
        }
        if (this._options.map.data[y - 1][x] === MapElement.F) {
            return true;
        }
        return false;
    }

    canPlayerMoveDownward(): boolean {
        const { x, y } = this._absolutePlayerPosition;
        if (y >= this._options.map.dimension.height - 1) {
            return false;
        }
        if (this._options.map.data[y + 1][x] === MapElement.F) {
            return true;
        }
        return false;
    }

    canPlayerMoveLeftward(): boolean {
        const { x, y } = this._absolutePlayerPosition;
        if (x <= 0) {
            return false;
        }
        if (this._options.map.data[y][x - 1] === MapElement.F) {
            return true;
        }
        return false;
    }

    canPlayerMoveRightward(): boolean {
        const { x, y } = this._absolutePlayerPosition;
        if (x >= this._options.map.dimension.width - 1) {
            return false;
        }
        if (this._options.map.data[y][x + 1] === MapElement.F) {
            return true;
        }
        return false;
    }

    addPlayer(player: Player) {
        this._player = player;
    }

    resetPlayers() {
        this._player = null;
    }
}