'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

popUpRefresh.addEventListener('click', () => {
  hidePopUp();
  startGame();
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showBoard();
  startGameTimer();
  popUp.classList.add('pop-up--hide');
}

function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopUp('Retry❓');
}

function startGameTimer() {
  let remainingTime = GAME_DURATION_SEC;
  UpdateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      return;
    }
    UpdateTimerText(--remainingTime);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function UpdateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const minutes2 = minutes.toString().padStart(2, '0');
  const seconds = time % 60;
  const seconds2 = seconds.toString().padStart(2, '0');
  gameTimer.textContent = `${minutes2}:${seconds2}`;
}

function showBoard() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function showPopUp(text) {
  popUp.classList.remove('pop-up--hide');
  popUpMessage.textContent = text;
}
function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function showStopButton() {
  const icon = document.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}
function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}
function showPlayButton() {
  const icon = document.querySelector('.fa-stop');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
}

function initGame() {
  //벌레와 당근 생성 후 field에 배치
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('bug', BUG_COUNT, 'img/bug.png');
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = field.offsetWidth - CARROT_SIZE;
  const y2 = field.offsetHeight - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
