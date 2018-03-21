import { Resources } from './../../resources';
import { Character } from './character';
import { CharacterView } from './view';

export class CharacterFactory {

    public createDefaultCharacter(stage: PIXI.Container) {
        let character = new Character({
            movementSpeed: 300,
            width: 40,
            height: 84
        });
        character.setPosition(300, 500);
        let view = new CharacterView(stage, Resources.CHARACTER.loaded, character);

        return view;
    }
}