import { LogLevel } from "./log-level";

export class Logger {
    private _level: LogLevel;

    constructor(level: LogLevel) {
        this._level = level;
    }

    debug(...messages: any[]) {
        if (this._level == LogLevel.DEBUG) {
            console.log("\u001b[30m DEBUG: \u001b[0m", ...messages);
        }
    }

    warn(...messages: any[]) {
        if (this._level >= LogLevel.WARN) {
            console.log("\u001b[35m WARN:  \u001b[0m", ...messages);
        }
    }

    info(...messages: any[]) {
        if (this._level >= LogLevel.INFO) {
            console.log("\u001b[32m INFO:  \u001b[0m", ...messages);
        }
    }

    error(...messages: any[]) {
        if (this._level >= LogLevel.ERROR) {
            console.log("\u001b[31m ERROR:  \u001b[0m", ...messages);
        }
    }

    fatal(...messages: any[]) {
        console.log("\u001b[31m FATAL:  \u001b[0m", ...messages);
    }}