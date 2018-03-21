import Container from 'typedi';

import { Resources } from '../../resources';
import { SFX } from './../../../../utils/sfx/sfx';
import { AnimationConfig, SpriteAnimator } from './../../../../utils/spriteAnimator';
import { Collidable } from './../../physics/world';
import { ICharacter } from './character';


export class CharacterView implements ICharacter {

    private character: ICharacter;
    private animator: SpriteAnimator;
    private sprite: PIXI.Sprite;
    private stage: PIXI.Container;
    private movedInPrevFrame: boolean;

    constructor(stage: PIXI.Container, atlas: PIXI.loaders.Resource, character: ICharacter) {
        this.character = character;
        this.stage = stage;
        this.movedInPrevFrame = false;
        let animation = <AnimationConfig[]>[
            {
                name: "idle",
                textureName: frameNumber => `knight iso char_idle_${frameNumber}.png`,
                numFrames: 4,
                FPS: 10
            },
            {
                name: "run_left",
                textureName: frameNumber => `knight iso char_run left_${frameNumber}.png`,
                numFrames: 5,
                FPS: 10
            },
            {
                name: "run_right",
                textureName: frameNumber => `knight iso char_run right_${frameNumber}.png`,
                numFrames: 5,
                FPS: 10
            }
        ];
        this.sprite = new PIXI.Sprite();
        this.sprite.anchor.set(0.5, 0.5);
        this.animator = new SpriteAnimator(atlas, animation);
        this.animator.attachTo(this.sprite);
        this.animator.runAnimation("idle");

        let pos = this.character.getPosition();
        this.sprite.position.set(pos.x, pos.y);
        this.stage.addChild(this.sprite);
    }

    public standOn(object: Collidable) {
        this.character.standOn(object);
    }
    public getPosition() {
        return this.character.getPosition();
    }

    public moveX(v: number) {
        this.character.moveX(v);

        if (v > 0)
            this.animator.runIfNotRunning("run_right");
        else if (v < 0)
            this.animator.runIfNotRunning("run_left");

        this.movedInPrevFrame = true;
        Container.get(SFX).loop(Resources.FOOTSTEPS);
    }

    public update(delta: number) {
        this.character.update(delta);
        this.animator.update(delta);
        let pos = this.character.getPosition();
        this.sprite.position.set(pos.x, pos.y);

        if (!this.movedInPrevFrame) {
            this.animator.runIfNotRunning("idle");
            Container.get(SFX).stop(Resources.FOOTSTEPS);
        }
        this.movedInPrevFrame = false;
    }

    public getBody() {
        return this.character.getBody();
    }
}