export class PointsCounter {
    private text: PIXI.Text;
    private stage: PIXI.Container;
    private points: number;

    constructor(stage: PIXI.Container, points: number) {
        this.stage = stage;
        this.points = points;
        let style = new PIXI.TextStyle({
            fontFamily: "Minecraft",
            fontSize: 60,
            fill: "white"
        });

        this.text = new PIXI.Text("0", style);
        this.text.position.x = 400
        this.text.position.y = 300;
        this.text.scale.set(0.7, 0.7);
        this.text.anchor.set(0.5, 0.5);
        this.stage.addChild(this.text);

    }


    public async startAnimation() {
        console.log(this.points);
        return new Promise<any>(resolve => {
            let duration = 1500;
            let tween = PIXI.tweenManager.createTween(this.text.scale, { time: duration })
                .from({ x: this.text.scale.x, y: this.text.scale.y })
                .to({ x: 1, y: 1 })
                .start();

            tween.on('update', (progress: number) => {
                this.text.text = Math.round(this.points * progress).toString();
            });
            tween.once('end', resolve);
        });
    }
}