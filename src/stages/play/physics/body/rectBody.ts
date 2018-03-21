import { SyncEvent } from 'ts-events';

import { CanMoveCheck } from './../collisionDetector';
import { Body } from './body';

export class RectBody implements Body {
    private shape: PIXI.Rectangle;
    private collisionEvent: SyncEvent<Body>;
    private owner: any;
    private canMoveCheck: CanMoveCheck | undefined;
    private _canBlockMove: boolean;
    private _readyToRemove: boolean;
    private id: number;

    constructor(shape: PIXI.Rectangle, owner: any, canBlockMove: boolean, id: number) {
        this.shape = shape;
        this.collisionEvent = new SyncEvent<Body>();
        this.owner = owner;
        this._canBlockMove = canBlockMove;
        this._readyToRemove = false;

        this.id = id;
    }

    public canBlockMove() {
        return this._canBlockMove;
    }
    public limitMovement(canMove: CanMoveCheck) {
        this.canMoveCheck = canMove;
    }
    public getOwner() {
        return this.owner;
    }

    public getBoundingBox() {
        return this.shape;
    }

    public getCenter() {
        return new PIXI.Point(this.shape.x + this.shape.width / 2, this.shape.y + this.shape.height / 2);
    }

    public setPosition(x: number, y: number): void {
        this.shape.x = x - this.shape.width / 2;
        this.shape.y = y - this.shape.height / 2;
    }

    public changeOwner(owner: any): void {
        this.owner = owner;
    }

    public colidesWith(body: Body, withTranslationX: number, withTranslationY: number) {
        let rect1 = body.getBoundingBox();
        let rect2 = this.shape;
        return rect1.x < rect2.x + rect2.width + withTranslationX &&
            rect1.x + rect1.width > rect2.x + withTranslationX &&
            rect1.y < rect2.y + rect2.height + withTranslationY &&
            rect1.height + rect1.y > rect2.y + withTranslationY;
    }

    public getId(){
        return this.id;
    }

    public remove() {
        this._readyToRemove = true;
    }

    public isReadyToRemove() {
        return this._readyToRemove;
    }

    public onCollision() {
        return this.collisionEvent;
    }

    public move(x: number, y: number) {
        let canMove = !this.canMoveCheck || this.canMoveCheck(x, y);
        if (canMove) {
            this.shape.x += x;
            this.shape.y += y;
        }
        return canMove;
    }

}