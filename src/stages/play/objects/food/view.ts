import { SpriteAnimator } from './../../../../utils/spriteAnimator';
import { Resources } from './../../resources';
import { IFood } from './food';

export class FoodView implements IFood {

    private food: IFood;
    private sprite: PIXI.Sprite;
    private stage: PIXI.Container;
    private isReadyToRemove: boolean;
    private animator!: SpriteAnimator;

    constructor(stage: PIXI.Container, image: PIXI.Texture, food: IFood) {
        this.food = food;
        this.food.getBody().changeOwner(this);
        this.stage = stage;
        this.sprite = new PIXI.Sprite(image);
        this.sprite.anchor.set(0.5, 0.5);
        let pos = this.food.getPosition();
        this.sprite.position.set(pos.x, pos.y);
        this.stage.addChild(this.sprite);

        this.isReadyToRemove = false;
    }

    public readyToRemove() {
        return this.food.readyToRemove() && this.isReadyToRemove;
    }

    public burn() {
        this.food.remove();

        let animator = this.animator = new SpriteAnimator(Resources.SMOKE.loaded, [{
            name: 'smoke',
            numFrames: 16,
            FPS: 15,
            textureName: (frame) => frame.toString()
        }]);
        animator.attachTo(this.sprite);
        animator.runAnimation('smoke');
        animator.on("end", this._remove.bind(this));
    }

    public remove() {
        this.food.remove();
        let tween = PIXI.tweenManager.createTween(this.sprite, { time: 1000 })
            .from({ alpha: 1 })
            .to({ alpha: 0 })
            .start()
            .once("end", this._remove.bind(this));
    }

    private _remove() {
        this.isReadyToRemove = true;
        this.stage.removeChild(this.sprite);
    }
    public getPosition() {
        return this.food.getPosition();

    }

    public setPosition(x: number, y: number) {
        this.food.setPosition(x, y);
    }
    public update(delta: number) {
        if (!this.food.readyToRemove()) {
            this.food.update(delta);

            let pos = this.food.getPosition();
            this.sprite.position.set(pos.x, pos.y);
            this.sprite.rotation = (pos.x + pos.y) / 20;
        }

        if (this.animator)
            this.animator.update(delta);
    }

    public getBody() {
        return this.food.getBody();
    }
}