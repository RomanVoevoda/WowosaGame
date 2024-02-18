'use strict';

const playerContainer = document.querySelector('.audio__player__container');
const playButton = document.querySelector('#play');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.audio__progress__container');
const musicTitle = document.querySelector('#music__title');

//Массив музыки
const songs = ['Главная тема', 'Легионы Потолота', 'Ваше демократическое имя', 'Большая Пушка'];

//Индекс первой песни при загрузке:
let songIndex = 0;

//Загрузка информации о песне DOM
loadSong(songs[songIndex]);

//Функции
function loadSong(song) {
  musicTitle.innerText = song;
  audio.src = `../media/music/${song}.ogg`;
}

function playSong() {
  playerContainer.classList.add('play');
  playButton.querySelector('i.fas').classList.remove('fa-play');
  playButton.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  playerContainer.classList.remove('play');
  playButton.querySelector('i.fas').classList.add('fa-play');
  playButton.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--

  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++

  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function setVolume(audioElement, inputID){
  let currentVolume = Number(document.getElementById(inputID).value) / 100;
  audioElement.volume = currentVolume;
}

//Прослушиватель событий
playButton.addEventListener('click', () => {
  const isPlaying = playerContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
} )

// Событие смены трека
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

//Для начальной громкости
audio.volume = 0.3;
gameClickSound.volume = 0.3;
startSound.volume = 0.3;
clickButtonSound.volume = 0.3;