import { FoodFactory } from './factory';
import { IFood } from './food';
import { FoodGenerator } from './generator';

export class FoodManager {
    private objects: IFood[];
    private generator: FoodGenerator;

    constructor(factory: FoodFactory) {
        this.objects = [];
        this.generator = new FoodGenerator({
            intervalSeconds: 0.85,
            factory: factory
        }, this.add.bind(this))
    }

    private add(food: IFood) {
        this.objects.push(food);
    }

    public flood() {
        this.generator.generateSome(100);
    }
    public update(delta: number) {
        for (let i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i];
            if (obj.readyToRemove()) {
                this.objects.splice(i, 1);
                i--;
                continue;
            }

            obj.update(delta);
        }

        this.generator.update(delta);
    }
}