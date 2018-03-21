declare type FixedTimeLoopCallback = (delta: number) => void;

interface FixedTimeLoopConfig {
    callback: FixedTimeLoopCallback;
    targetFPS: number;
}
export class FixedTimeLoop {
    private intervalHandler: any;
    private frameTime: number;
    private prevUpdateTimestamp: number;
    private callback: FixedTimeLoopCallback;

    constructor(config: FixedTimeLoopConfig) {
        this.prevUpdateTimestamp = Date.now();
        this.frameTime = 1000 / config.targetFPS;
        this.intervalHandler = setInterval(this.update.bind(this), 10);
        this.callback = config.callback;
    }

    private update() {
        let delta = Date.now() - this.prevUpdateTimestamp;
        while (delta > this.frameTime) {
            this.callback(this.frameTime);
            delta -= this.frameTime;
            this.prevUpdateTimestamp += this.frameTime
        }
    }
}