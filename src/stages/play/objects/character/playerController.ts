import { input } from './../../../../input/input';
import { Keycodes } from './../../../../input/keyboard';
import { ICharacter } from './character';

interface ControllerKeys {
    MOVE_LEFT: Keycodes;
    MOVE_RIGHT: Keycodes;
}

export class PlayerCharacterController {

    private character: ICharacter;
    private keys: ControllerKeys;

    constructor(character: ICharacter, keys: ControllerKeys) {
        this.character = character;
        this.keys = keys;
    }

    public update(delta: number) {
        if (input.keyboard.isPressed(this.keys.MOVE_LEFT))
            this.character.moveX(-1 * delta/1000);

        if (input.keyboard.isPressed(this.keys.MOVE_RIGHT))
            this.character.moveX(1 * delta/1000);
    }
}