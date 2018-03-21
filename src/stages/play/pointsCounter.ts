import Rx from 'rxjs/Rx';

import { HUDObservable } from './hud/hud';

export class PointsCounter implements HUDObservable {
    private observable: Rx.BehaviorSubject<number>;
    private disabled: boolean;

    constructor() {
        this.observable = new Rx.BehaviorSubject(0);
        this.disabled = false;
    }

    public addOne() {
        if (!this.disabled)
            this.observable.next(this.observable.getValue() + 10);
    }

    public disable() {
        this.disabled = true;
    }
    public getObservable() {
        return this.observable;
    }
}