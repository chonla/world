import { Engine } from "./engine/engine";
import { EngineOptions } from "./engine/engine-options";
import { LogLevel } from "./logger/log-level";
import { Logger } from "./logger/logger";

const logger = new Logger(LogLevel.DEBUG);
const engineOptions: EngineOptions = {
    logger: logger,
};
const engine = new Engine(engineOptions);

document.addEventListener('DOMContentLoaded', (event) => {
    engine.initialize();
});