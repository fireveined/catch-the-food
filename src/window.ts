const WIDTH = 800;
const HEIGHT = 600;

export interface IGameWindow {
    getPixiStage(): PIXI.Container;
    getWidth(): number;
    getHeight(): number;
}

export class GameWindow implements IGameWindow {
    private app: PIXI.Application;

    constructor() {
        this.app = new PIXI.Application({
            width: WIDTH,
            height: HEIGHT,
            antialias: true
        });
        this.appendToContainer();
    }

    public getPixiStage() {
        return this.app.stage;
    }

    public getWidth() {
        return this.app.screen.width;
    }

    public getHeight() {
        return this.app.screen.height;
    }
    
    private appendToContainer() {
        let gameContainer = document.getElementById('game-container');
        if (gameContainer)
            gameContainer.appendChild(this.app.view)
        else
            console.error("Can't find 'game-container'");
    }

}