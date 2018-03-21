import { Container } from 'typedi';

import { Resources } from './../../resources';
import { Food } from './food';
import { FoodView } from './view';

export class FoodFactory {

    private images: PIXI.Texture[];
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        let image_w = 16;
        let image_h = 16;
        this.images = [];
        let baseTexture = Resources.FOOD_TILESET.loaded.texture.baseTexture;
        for (let x = 0; x < 8; x++)
            for (let y = 0; y < 8; y++) {
                let tx = x * image_w;
                let ty = y * image_h;
                this.images.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(tx, ty, image_w, image_h)));
            }
    }
    public create(vx: number, vy: number) {
        let food = new Food({
            width: 13,
            height: 13,
            vx,
            vy
        });

        let image = this.images[Math.floor(Math.random() * this.images.length)];
        let view = new FoodView(this.stage, image, food)
        return view;
    }
}