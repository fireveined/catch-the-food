import { LifeCounter } from './lifeCounter';
import Rx from 'rxjs/Rx';
import { PointsCounter } from './pointsCounter';

export interface HUDObservable {
    getObservable(): Rx.Observable<number>;
}

export class HUD {
    private pointsCounter: PointsCounter;
    private lifeCounter: LifeCounter;

    constructor(stage: PIXI.Container) {
        this.pointsCounter = new PointsCounter(stage);
        this.lifeCounter = new LifeCounter(stage);
    }

    public attachPointsCounter(obj: HUDObservable) {
        this.pointsCounter.attachTo(obj);

    }

    public attachLifeCounter(obj: HUDObservable) {
        this.lifeCounter.attachTo(obj);
    }
}