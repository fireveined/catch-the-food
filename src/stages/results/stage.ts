import { Stage as BaseStage } from '../base/stage';
import { input, Keycodes } from './../../input/input';
import { TextBlinker } from './../../utils/textBlinker';
import { GameResult } from './../gameResult';
import { PointsCounter } from './pointsCounter';
import { Resources } from './resources';

export class ResultsStage extends BaseStage {
    static resources = Resources;

    public onInit(result: GameResult) {
        let counter = new PointsCounter(this.stage, result.points);

        this.stage.alpha = 0;
        PIXI.tweenManager.createTween(this.stage, { time: 800 })
            .from({ alpha: 0 })
            .to({ alpha: 1 })
            .start()
            .once('end', counter.startAnimation.bind(counter))


        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 20,
            fill: "white"
        });
        let text = new PIXI.Text("Press space to play again...", style);
        text.position.x = 400
        text.position.y = 500;
        text.anchor.set(0.5, 0.5);
        this.stage.addChild(text);
        new TextBlinker(text);

        input.keyboard.onceDown(Keycodes.KEY_SPACE, this.openGame.bind(this));
    }

    public onUpdate() {

    }

    public openGame() {
        this.stageChanger.start("play");
    }

    public onRemove() {

    }

}