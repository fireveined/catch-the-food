import { HUDObservable } from './hud';


export class PointsCounter {
    private text: PIXI.Text;
    private stage: PIXI.Container;
    private value: number;

    constructor(stage: PIXI.Container) {
        this.value = 0;
        this.stage = stage;

        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 20,
            fill: "white"
        });

        this.text = new PIXI.Text(this.value.toString(), style);
        this.text.position.x = 20
        this.text.position.y = 600 - 15;
        this.text.anchor.set(0, 0.5);
        this.stage.addChild(this.text);
    }

    public set(value: number) {
        this.text.text = value.toString();
        PIXI.tweenManager.createTween(this.text.scale, { time: 200 })
            .from({ x: 1.3, y: 1.3 })
            .to({ x: 1, y: 1 })
            .start();
    }

    public attachTo(object: HUDObservable){
        object.getObservable().subscribe(this.set.bind(this));
    }
}