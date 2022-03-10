'use strict';

import * as sound from './sound.js';

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});
const CARROT_SIZE = 80;

export class Field {
  constructor(carrotCount, bugCount) {
    this.field = document.querySelector('.game__field');
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('bug', this.bugCount, 'img/bug.png');
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.field.offsetWidth - CARROT_SIZE;
    const y2 = this.field.offsetHeight - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
