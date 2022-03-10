'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this._hide();
    });
  }

  setClickListener(callback) {
    this.onClick = callback;
  }

  _hide() {
    this.popUp.classList.add('pop-up--hide');
  }

  showWithText(text) {
    this.popUp.classList.remove('pop-up--hide');
    this.popUpMessage.textContent = text;
  }
}
