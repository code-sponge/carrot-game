'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Repaly❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'you win😎';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'you lost😎';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
