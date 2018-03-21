import { IFloor } from './floor';

export class FlorView implements IFloor {

    private floor: IFloor;
    private sprite: PIXI.Sprite;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container, image: PIXI.Texture, floor: IFloor) {
        this.floor = floor;
        this.stage = stage;
        this.sprite = new PIXI.Sprite(image);
        this.sprite.anchor.set(0.5, 0.5);
        let pos = this.floor.getPosition();
        this.sprite.position.set(pos.x, pos.y);
        this.stage.addChild(this.sprite);
    }

    public getPosition() {
        return this.floor.getPosition();

    }
    public getBody() {
        return this.floor.getBody();
    }
}