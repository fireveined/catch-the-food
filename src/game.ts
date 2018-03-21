import 'pixi-tween';

import { Container } from 'typedi';

import { FixedTimeLoop } from './fixedTimeLoop';
import { BasicLoaderBackground, PreLoader } from './stages/base/loader';
import { IStageConstructor } from './stages/base/stage';
import { StageManager } from './stages/stageManager';
import { SFX } from './utils/sfx/sfx';
import { GameWindow } from './window';


export class Game {
    private preloader: PreLoader;
    private stageManager: StageManager;

    constructor() {
        let gameWindow = new GameWindow();
        let pixiStage = gameWindow.getPixiStage();
        Container.set(SFX, new SFX());

        this.stageManager = new StageManager(gameWindow);
        this.preloader = new PreLoader(new BasicLoaderBackground(gameWindow));

    }

    private update(delta: number) {
        this.stageManager.updateCurrentStage(delta);
        PIXI.tweenManager.update(delta)
    }

    public addStage(stage: IStageConstructor, name: string) {
        this.stageManager.add(stage, name);
        this.preloader.add(stage.resources);
    }

    public async run(name: string) {
        new FixedTimeLoop({
            callback: this.update.bind(this),
            targetFPS: 50
        });

        await this.preloader.load();
        this.stageManager.start(name);
    }
}