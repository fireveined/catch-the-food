import { Container } from 'typedi';

import { Body } from './../../physics/body/body';
import { BodyFactory } from './../../physics/body/bodyFactory';
import { Collidable } from './../../physics/world';


export interface IFood extends Collidable {
    getBody(): Body;
    update(delta: number): void;
    getPosition(): PIXI.Point;
    setPosition(x: number, y: number): void;
    remove(): void;
    readyToRemove(): boolean;
}

interface FoodConfig {
    width: number;
    height: number;
    vx: number;
    vy: number;
}

export class Food implements IFood {

    private body: Body;
    private config: FoodConfig;
    private removed: boolean;

    constructor(config: FoodConfig) {
        this.config = config;
        let bodyFactory = <BodyFactory>Container.get(BodyFactory);
        this.body = bodyFactory.fromShape(new PIXI.Rectangle(-100, -100, config.width, config.height), this, {
            itBlocksMove: false,
            itsMoveCanBeBlocked: true
        });
        this.removed = false;
    }

    public readyToRemove() {
        return this.removed;
    }

    public remove() {
        this.body.remove();
        this.removed = true;
    }
    public getBody() {
        return this.body;
    }

    public update(delta: number) {
        this.body.move(this.config.vx * delta / 1000, 0);
        this.body.move(0, this.config.vy * delta / 1000);
    }

    public setPosition(x: number, y: number) {
        this.body.setPosition(x, y);
    }

    public getPosition() {
        return this.body.getCenter();
    }
}