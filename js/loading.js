'use strict';

const gameWindow = document.querySelector('.game__window');
const startButton = document.querySelector('.start__game');
const loadingHeader = document.querySelector('#loading__header');
const loadingText = document.querySelector('#loading__text');
const loadingProgress = document.querySelector('.loading__progress');
const loadingAudio = document.querySelector('#loading_sound');
const loadingContainer = document.querySelector('.loading__info__container');
const startSound = document.querySelector('#startSound');
const buttonMap = document.querySelector('.button__map');
const game = document.querySelector('.game__container');

const phrasesList = ['Наряжаем актёров', 'Советуемся с гениями IT', 'Уничтожаем фиксиков', 'Ещё чуть-чуть', 'Заставляем фиксиков работать', 'Ой, загрузка ещё идёт?', 'Фиксики не хотят работать'];

function takePhrase(){
  let phraseNumber = roll(0, (phrasesList.length - 1));
  loadingText.innerText = phrasesList[phraseNumber];
}

function loadingGame() {
  gameWindow.classList.add('loading');
  startButton.classList.add('off');
  loadingContainer.classList.add('on');
  startSound.play();
  loadingAudio.play();
}

function resumeLoading() {
  loadingAudio.play();
}

function pauseLoading() {
  loadingAudio.pause();
}

function endOfLoading() {
  loadingContainer.classList.remove('on');
  gameWindow.classList.remove('loading');
  gameWindow.classList.add('on');
  game.classList.add('on');
  buttonMap.setAttribute("name", "button__map");
  playSong();
}

function randomLoadingPause(){
  let pause = roll(2000, 10000);

  pauseLoading();
  setTimeout( resumeLoading, pause);
}

function updateLoadingInfo (e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = Math.floor((currentTime / duration) * 100);

  if((progressPercent == 20) || (progressPercent == 50) || (progressPercent == 70)) {
    randomLoadingPause();
  }

  if((progressPercent >= 10) && (progressPercent < 20)) {
    loadingHeader.innerText = 'Загрузка..';
  } else if ((progressPercent >= 20) && (progressPercent < 30)) {
    loadingHeader.innerText = 'Загрузка...';
  } else if ((progressPercent >= 30) && (progressPercent < 40)) {
    loadingHeader.innerText = 'Загрузка.';
  } else if ((progressPercent >= 40) && (progressPercent < 50)) {
    loadingHeader.innerText = 'Загрузка..';
  } else if ((progressPercent >= 50) && (progressPercent < 60)) {
    loadingHeader.innerText = 'Загрузка...';
  } else if ((progressPercent >= 60) && (progressPercent < 70)) {
    loadingHeader.innerText = 'Загрузка.';
  } else if ((progressPercent >= 70) && (progressPercent < 80)) {
    loadingHeader.innerText = 'Загрузка..';
  } else if ((progressPercent >= 90) && (progressPercent < 100)) {
    loadingHeader.innerText = 'Загрузка...';
  }
}

function updateLoadingProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  loadingProgress.style.width = `${progressPercent}%`;
}

loadingAudio.addEventListener('timeupdate', updateLoadingProgress);
loadingAudio.addEventListener('timeupdate', updateLoadingInfo);
loadingAudio.addEventListener('playing', takePhrase);
loadingAudio.addEventListener('ended', endOfLoading);