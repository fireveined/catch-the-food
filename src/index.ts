import 'reflect-metadata';

import { Game } from './game';
import { HelloStage } from './stages/hello/stage';
import { PlayStage } from './stages/play/stage';
import { ResultsStage } from './stages/results/stage';

window.onload = () => {
    let game = new Game();
    game.addStage(HelloStage, 'hello');
    game.addStage(PlayStage, 'play');
    game.addStage(ResultsStage, 'results');
    game.run('hello');
};
