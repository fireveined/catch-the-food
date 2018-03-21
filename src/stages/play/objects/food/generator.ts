import { Container } from 'typedi';

import { RandomGenerator } from './../../../../utils/randomGenerator';
import { FoodFactory } from './factory';
import { IFood } from './food';

interface GeneratorConfig {
    intervalSeconds: number;
    factory: FoodFactory;
}

declare type FoodGeneratedCallback = (food: IFood) => void;
export class FoodGenerator {

    private timeToNextGeneration: number;
    private config: GeneratorConfig;
    private onGenerated: FoodGeneratedCallback;
    private randomGenerator: RandomGenerator;

    constructor(config: GeneratorConfig, onGenerated: FoodGeneratedCallback) {
        this.config = config;
        this.timeToNextGeneration = 0;
        this.onGenerated = onGenerated;
        this.randomGenerator = Container.get(RandomGenerator);
    }

    private generate() {
        let vx = this.randomGenerator.get(-20, 20);
        let vy = this.randomGenerator.get(50, 200);
        let food = this.config.factory.create(vx, vy);

        let x = this.randomGenerator.get(100, 700);
        food.setPosition(x, -20);
        this.onGenerated(food);
    }

    public generateSome(number: number) {
        for (let i = 0; i < number; i++)
            this.generate();
    }
    
    private randTimeToNextGeneration() {
        return (this.config.intervalSeconds + (this.randomGenerator.getDouble() - 0.5) * this.config.intervalSeconds * 0.5) * 1000;
    }

    public update(delta: number) {
        this.timeToNextGeneration -= delta;

        if (this.timeToNextGeneration < 0) {
            this.generate();
            this.timeToNextGeneration = this.randTimeToNextGeneration();
        }
    }
}