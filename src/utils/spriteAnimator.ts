import { SyncEvent } from 'ts-events';
import { logger } from './logger';
import { AnimationRuner } from './animationRuner';

export interface AnimationConfig {
    name: string;
    textureName: (frameNumber: number) => string;

    numFrames: number;
    FPS: number;
}

export interface Animation {
    config: AnimationConfig;
    frames: PIXI.Texture[];
}

declare type AnimationMap = { [name: string]: Animation };
declare type AnimationEvents = 'end';

export class SpriteAnimator {
    private animations: AnimationMap;
    private sprite!: PIXI.Sprite;
    private runner: AnimationRuner;
    private events: SyncEvent<AnimationEvents>;

    constructor(atlas: PIXI.loaders.Resource, animations: AnimationConfig[]) {
        this.animations = this.attachFramesTextures(atlas, animations);
        this.runner = new AnimationRuner();
        this.runner.onAnimationEnd(() => this.events.post(<AnimationEvents>"end"))
        this.events = new SyncEvent<AnimationEvents>();
    }

    public on(event: AnimationEvents, callback: Function) {
        this.events.attach(((data) => {
            if (data === event)
                callback();
        }));
    }

    public attachTo(sprite: PIXI.Sprite) {
        this.sprite = sprite;
        let firstAnimation = this.animations[Object.keys(this.animations)[0]];
        this.runner.run(firstAnimation);
        this.runner.stop();
    }

    public runIfNotRunning(name: string) {
        if (this.runner.getCurrentAnimation().config.name !== name || this.runner.isStopped())
            this.runAnimation(name);
    }


    public runAnimation(name: string) {
        let anim = this.animations[name];
        if (!anim) {
            console.error(`Can't find animation ${anim}`);
            return;
        }
        this.runner.run(anim);
    }

    public update(delta: number) {
        this.runner.update(delta);

        let frame = this.runner.getCurrentFrame();
        if (this.sprite && this.sprite.texture != frame)
            this.sprite.texture = frame;
    }
    public stop() {
        this.runner.stop();
    }

    private attachFramesTextures(atlas: PIXI.loaders.Resource, configs: AnimationConfig[]) {
        let animations = <AnimationMap>{};
        for (let config of configs) {
            let animation = <Animation>{
                config,
                frames: this.generateFrames(atlas, config)
            }
            animations[config.name] = animation;
        }
        return animations;
    }

    private generateFrames(resource: PIXI.loaders.Resource, config: AnimationConfig) {
        let frames = <PIXI.Texture[]>[];
        let atlas = resource.textures;

        if (atlas === undefined) {
            logger.error("Can't load textures from " + resource.name);
            return;
        }

        for (let i = 0; i < config.numFrames; i++) {
            let frameName = config.textureName(i);
            let frame = atlas[frameName];
            if (!frame)
                logger.error("Can't find frame " + frameName);
            frames.push(frame);
        }
        return frames;
    }

}

