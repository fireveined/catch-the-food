import { Container, Service } from 'typedi';

import { Stage as BaseStage } from '../base/stage';
import { Keycodes } from './../../input/input';
import { SFX } from './../../utils/sfx/sfx';
import { GameResult } from './../gameResult';
import { HUD } from './hud/hud';
import { LifeCounter } from './lifeCounter';
import { ICharacter } from './objects/character/character';
import { CharacterFactory } from './objects/character/factory';
import { PlayerCharacterController } from './objects/character/playerController';
import { Floor } from './objects/floor/floor';
import { FlorView } from './objects/floor/view';
import { FoodFactory } from './objects/food/factory';
import { FoodManager } from './objects/food/manager';
import { FoodView } from './objects/food/view';
import { World } from './physics/world';
import { PointsCounter } from './pointsCounter';
import { Resources } from './resources';

@Service()
export class PlayStage extends BaseStage {
    static resources = Resources;
    private character!: ICharacter;
    private playerController!: PlayerCharacterController;
    private foodManager!: FoodManager;
    private world!: World;
    private pointsCounter!: PointsCounter;

    public onInit() {
        let mapStage = new PIXI.Container();
        this.stage.addChild(mapStage);

        this.world = new World();

        let floor = new FlorView(mapStage, Resources.FLOOR.loaded.texture, new Floor({
            height: 31,
            y: 4
        }))

        this.character = new CharacterFactory().createDefaultCharacter(mapStage);
        this.character.standOn(floor);
        this.playerController = new PlayerCharacterController(this.character, {
            MOVE_LEFT: Keycodes.KEY_LEFT,
            MOVE_RIGHT: Keycodes.KEY_RIGHT
        });

        this.foodManager = new FoodManager(new FoodFactory(mapStage));

        let pointsCounter = this.pointsCounter = new PointsCounter();

        this.world.collisionDetector.withAll(FoodView, this.character).attach((collision) => {
            collision.obj1.burn();
            pointsCounter.addOne();
            Container.get(SFX).play(Resources.EAT);
        });


        let lifeCounter = new LifeCounter(10);

        this.world.collisionDetector.withAll(FoodView, floor).attach((collision) => {
            collision.obj1.remove();
            lifeCounter.removeOne();
            Container.get(SFX).play(Resources.BOOM);
        });

        lifeCounter.getObservable()
            .filter(value => value === 0)
            .subscribe(this.loose.bind(this));

        let hud = new HUD(this.stage);
        hud.attachPointsCounter(pointsCounter);
        hud.attachLifeCounter(lifeCounter);


        Container.get(SFX).loop(Resources.SOUNDTRACK);
    }

    private loose() {
        Container.get(SFX).fadeOutAll(2800);

        this.foodManager.flood();
        PIXI.tweenManager.createTween(this.stage, { time: 2800 })
            .from({ alpha: 1 })
            .to({ alpha: 0 })
            .start()
            .once("end", this.goToResults.bind(this))
    }

    private goToResults() {
        this.stageChanger.start('results', <GameResult>{
            points: this.pointsCounter.getObservable().getValue()
        });
    }

    public onUpdate(delta: number) {
        this.world.update(delta);
        this.character.update(delta);
        this.playerController.update(delta);
        this.foodManager.update(delta);
    }

    public onRemove() {

    }

}