import { SyncEvent } from 'ts-events';

import { Body } from './body/body';
import { Collidable } from './world';

export type CanMoveCheck = (translationX: number, translationY: number) => boolean;

type CollisionHash = string;
type CollisionMap = { [hash: string]: (true | undefined) };

export class CollisionDetector {
    private objects: Body[];
    private collisionMap: CollisionMap;

    constructor(objects: Body[]) {
        this.objects = objects;
        this.collisionMap = {};
    }

    private getHashFromTwoIds(id1: number, id2: number): CollisionHash {
        return id1 > id2 ? id1 + "-" + id2 : id2 + "-" + id1;
    }

    public with<T1 extends Collidable, T2 extends Collidable>(obj1: T1, obj2: T2) {
        let event = new SyncEvent<{ obj1: T1, obj2: T2 }>();
        obj1.getBody().onCollision().attach(obj => {
            if (obj == obj2.getBody())
                event.post({ obj1, obj2 });
        });
        return event;
    }

    public withAll<T1, T2 extends Collidable>(objs: new (...args: any[]) => T1, obj2: T2) {
        let event = new SyncEvent<{ obj1: T1, obj2: T2 }>();
        obj2.getBody().onCollision().attach(obj => {
            if (obj.getOwner() instanceof objs)
                event.post({ obj1: obj.getOwner(), obj2: obj2 });
        });
        return event;
    }

    public canMove(translationX: number, translationY: number, body: Body) {
        let canMove = true;
        let myId = body.getId();
        for (let obj of this.objects) {
            if (obj === body)
                continue;

            let hash = this.getHashFromTwoIds(myId, obj.getId());
            let collision = body.colidesWith(obj, translationX, translationY);
            if (collision) {
                if (obj.canBlockMove())
                    canMove = false;

                if (!this.collisionMap[hash]) {
                    this.collisionMap[hash] = true;
                    body.onCollision().post(obj);
                    obj.onCollision().post(body);
                }
            }
            else
                delete this.collisionMap[hash];
        }
        return canMove;
    }
}