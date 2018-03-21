import { Resources } from './../../play/resources';
import { HUDObservable } from './hud';

class Heart {
    private sprite: PIXI.Sprite;

    constructor(stage: PIXI.Container) {
        this.sprite = new PIXI.Sprite(Resources.HEART.loaded.texture);
        this.sprite.anchor.set(0.5, 0.5);
        stage.addChild(this.sprite);

    }
    public setPosition(x: number, y: number) {
        this.sprite.position.set(x, y);
    }

    public hide() {
        this.sprite.visible = false;
    }

    public show() {
        this.sprite.visible = true;
    }
    public isVisible() {
        return this.sprite.visible;
    }
    public getWidth() {
        return this.sprite.width;
    }
}

export class LifeCounter {
    private hearts: Heart[];
    private stage: PIXI.Container;
    constructor(stage: PIXI.Container) {
        this.hearts = [];
        this.stage = stage;
    }


    public set(value: number) {
        let heartsY = 600 - 15;
        for (let i = 0; i < value; i++) {
            if (!this.hearts[i]) {
                this.hearts[i] = new Heart(this.stage);
                this.hearts[i].setPosition(775 - i * (this.hearts[i].getWidth() * 1.2), heartsY);
            }
            this.hearts[i].show();
        }

        for (let i = value; i < this.hearts.length; i++)
            this.hearts[i].hide();
    }


    public attachTo(object: HUDObservable) {
        object.getObservable()
            .subscribe(this.set.bind(this));
    }
}