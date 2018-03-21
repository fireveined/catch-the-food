import { SyncEvent } from 'ts-events';
import { Animation } from './spriteAnimator';
export class AnimationRuner {
    private animation!: Animation;
    private currentFrame!: number;
    private prevFrame!: number;
    private frameTime!: number;
    private timeSinceLastChange!: number;
    private stopped!: boolean;
    private animationEndEvent: SyncEvent<void>;

    constructor() {
        this.animationEndEvent = new SyncEvent();
    }

    public run(animation: Animation) {
        this.animation = animation;
        this.currentFrame = 0;
        this.frameTime = 1000 / animation.config.FPS;
        this.timeSinceLastChange = 0;
        this.prevFrame = -1;
        this.stopped = false;
    }

    public onAnimationEnd(callback: Function) {
        this.animationEndEvent.attach(() => callback());
    }
    public getCurrentAnimation() {
        return this.animation;
    }

    public isStopped() {
        return this.stopped;
    }
    public update(delta: number) {
        if (this.stopped)
            return;

        this.prevFrame = this.currentFrame;
        this.timeSinceLastChange += delta;
        while (this.timeSinceLastChange > this.frameTime) {
            this.currentFrame = this.getNextFrame();
            this.timeSinceLastChange -= this.frameTime;
        }
    }

    public stop() {
        this.stopped = true;
        this.currentFrame = 0;
    }

    private getNextFrame() {
        let frame = this.currentFrame + 1;
        if (frame >= this.animation.config.numFrames) {
            this.animationEndEvent.post(void 0);
            frame = 0;
        }
        return frame;
    }

    public didFrameChanged() {
        return this.currentFrame != this.prevFrame;
    }
    public getCurrentFrame() {
        return this.animation.frames[this.currentFrame];
    }
}