import Rx from 'rxjs/Rx';

import { HUDObservable } from './hud/hud';

export class LifeCounter implements HUDObservable {
    private observable: Rx.BehaviorSubject<number>;
    constructor(startHP: number) {
        this.observable = new Rx.BehaviorSubject(startHP);
    }

    public removeOne() {
        if (this.observable.getValue() > 0)
            this.observable.next(this.observable.getValue() - 1);
    }

    public getObservable() {
        return this.observable;
    }
}