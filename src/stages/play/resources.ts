import { Resource } from '../base/loader/loader';

export const Resources = {
    CHARACTER: <Resource>{ url: "assets/character.json" },
    FOOD_TILESET: <Resource>{ url: "assets/food.png" },
    FLOOR: <Resource>{ url: 'assets/floor.png' },
    HEART: <Resource>{ url: 'assets/heart.png' },
    SMOKE: <Resource>{ url: 'assets/smoke.png', generateAtlas: { frameWidth: 16, frameHeight: 16 } },

    SOUNDTRACK: <Resource> {url: 'assets/sfx/soundtrack.ogg'},
    EAT: <Resource> {url: 'assets/sfx/eat.mp3'},
    FOOTSTEPS: <Resource> {url: 'assets/sfx/footsteps.mp3'},
    BOOM: <Resource> {url: 'assets/sfx/boom.wav'},
};


