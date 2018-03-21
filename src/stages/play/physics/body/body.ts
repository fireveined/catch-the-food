import { SyncEvent } from 'ts-events';

export { RectBody } from './rectBody';

export interface Body {
    getBoundingBox(): PIXI.Rectangle;
    getCenter(): PIXI.Point;
    colidesWith(body: Body, withTranslationX: number, withTranslationY: number): boolean;
    onCollision(): SyncEvent<Body>;
    getOwner(): any;
    setPosition(x: number, y: number): void;
    changeOwner(owner: any): void;

    canBlockMove(): boolean;
    move(x: number, y: number): boolean;

    isReadyToRemove(): boolean;
    remove(): void;

    getId(): number;
}