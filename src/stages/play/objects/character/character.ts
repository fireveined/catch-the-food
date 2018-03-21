import { Container } from 'typedi';

import { Body } from '../../physics/body/body';
import { BodyFactory } from './../../physics/body/bodyFactory';
import { Collidable } from './../../physics/world';

export interface ICharacter extends Collidable {
    getBody(): Body;
    moveX(v: number): void;
    update(delta: number): void;
    getPosition(): PIXI.Point;
    standOn(object: Collidable): void;
}


export interface CharacterConfig {
    movementSpeed: number;
    width: number;
    height: number
}

export class Character implements ICharacter {
    private body: Body;
    private config: CharacterConfig;

    constructor(config: CharacterConfig) {
        let bodyFactory = <BodyFactory>Container.get(BodyFactory);
        this.body = bodyFactory.fromShape(new PIXI.Rectangle(0, 0, config.width, config.height), this, {
            itBlocksMove: true,
            itsMoveCanBeBlocked: true
        });
        this.config = config;
    }

    public standOn(object: Collidable) {
        let top = object.getBody().getBoundingBox().top;
        let centerX = object.getBody().getCenter().x;
        this.body.setPosition(centerX, top - this.body.getBoundingBox().height / 2)
    }
    public setPosition(x: number, y: number) {
        this.body.setPosition(x, y);
    }

    public getBody() {
        return this.body;
    }

    public moveX(v: number) {
        this.body.move(v * this.config.movementSpeed, 0);
    }

    public getPosition() {
        return this.body.getCenter();
    }
    public update(delta: number) {

    }
}