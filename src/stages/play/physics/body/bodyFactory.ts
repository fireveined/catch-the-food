import { CanMoveCheck, CollisionDetector } from './../collisionDetector';
import { Collidable } from './../world';
import { Body } from './body';
import { RectBody } from './rectBody';

interface BodyConfig {
    itBlocksMove?: boolean;
    itsMoveCanBeBlocked?: boolean;
}

declare type BodyCreatedCallback = (body: Body) => void;

export class BodyFactory {
    private canMoveChecker: CollisionDetector;
    private onBodyCreated: BodyCreatedCallback;
    private currentId: number;

    constructor(canMoveChecker: CollisionDetector, onBodyCreated: BodyCreatedCallback) {
        this.canMoveChecker = canMoveChecker;
        this.onBodyCreated = onBodyCreated;
        this.currentId = 0;
    }

    public fromShape(shape: PIXI.Rectangle, owner: Collidable, config: BodyConfig = {}) {
        let body = new RectBody(shape, owner, !!config.itBlocksMove, this.currentId++);

        if (config.itsMoveCanBeBlocked) {
            let canMove: CanMoveCheck = (transX: number, transY: number) =>
                this.canMoveChecker.canMove(transX, transY, body);
            body.limitMovement(canMove);
        }
        this.onBodyCreated(body);
        return body;
    }
}