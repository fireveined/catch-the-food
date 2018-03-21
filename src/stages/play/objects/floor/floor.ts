import { Container } from 'typedi';
import { BodyFactory } from './../../physics/body/bodyFactory';
import { Collidable } from './../../physics/world';
import { Body } from '../../physics/body/body';

export interface IFloor extends Collidable {
    getBody(): Body;
    getPosition(): PIXI.Point;
}

interface Config {
    y: number;
    height: number;
}

export class Floor implements IFloor {

    private body: Body;
    constructor(config: Config) {
        let bodyFactory = <BodyFactory>Container.get(BodyFactory);
        this.body = bodyFactory.fromShape(new PIXI.Rectangle(0, 600-config.height, 800, config.height), this, {
            itBlocksMove: true,
            itsMoveCanBeBlocked: false
        });
    }

    public getPosition() {
        return this.body.getCenter();
    }
    public getBody(){
        return this.body;
    }
}