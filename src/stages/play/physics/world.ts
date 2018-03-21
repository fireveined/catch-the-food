import { Container } from 'typedi';

import { Body } from './body/body';
import { BodyFactory } from './body/bodyFactory';
import { CollisionDetector } from './collisionDetector';

export interface Collidable {
    getBody(): Body;
}

export class World {
    private objects: Body[];
    public collisionDetector: CollisionDetector;

    constructor() {
        this.objects = [];
        this.collisionDetector = new CollisionDetector(this.objects);

        let canMoveChecker = this.collisionDetector;
        let bodyFactory = new BodyFactory(canMoveChecker, body => this.add(body));

        let wall = <Collidable>{};
        bodyFactory.fromShape(new PIXI.Rectangle(-40, 0, 40, 550),
            wall, {
                itBlocksMove: true
            });

        bodyFactory.fromShape(new PIXI.Rectangle(800, 0, 40, 550),
            wall, {
                itBlocksMove: true
            });


        Container.set(BodyFactory, bodyFactory);
    }

    private add(obj: Body) {
        this.objects.push(obj);
    }

    public update(delta: number) {
        for (let i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i];
            if (obj.isReadyToRemove()) {
                this.objects.splice(i, 1);
                i--;
                continue;
            }
        }
    }
}