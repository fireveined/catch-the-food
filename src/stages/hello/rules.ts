import { Resources } from './resources';
export class RulesBoard {
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;


        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 40,
            fill: "white"
        });

        let text = new PIXI.Text('Catch The Food', style);
        text.position.set(400, 100)
        text.anchor.set(0.5, 0.5);
        this.stage.addChild(text);

        style = Object.assign({}, style);
        style.fontSize = 28;
        text = new PIXI.Text('Use arrows to control the character', style);
        text.position.set(400, 200)
        text.anchor.set(0.5, 0.5);
        this.stage.addChild(text);

        text = new PIXI.Text("Click 'S' to mute sound", style);
        text.position.set(400, 240)
        text.anchor.set(0.5, 0.5);
        this.stage.addChild(text);
    }

}