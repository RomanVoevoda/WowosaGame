'use strict';

const clickButtonSound = document.querySelector("#clickSound");
const gameStatusWindow = document.querySelector(".game__status__container");
const gameAutomapsWindow = document.querySelector(".game__automaps__container");
const gameArchivesWindow = document.querySelector(".game__archives__container");
const gameStatusText = document.querySelector("#game__status__list");

function switchWayById(id, way) {
  document.getElementById(id).src = way;
  playButtonSound();
}

function switchWayByIdWithTimeout(id, way, secondId, secondWay){
  document.getElementById(id).src = way;
  function switchWayAgain(){
    document.getElementById(secondId).src = secondWay;  
  }
  playButtonSound();
  setTimeout( switchWayAgain, 500);
}

function playButtonSound() {
  clickButtonSound.play();
}

function openInfoWindow(container1, container2, container3, id, way) {
  container1.style.display = "flex";
  container2.style.display = "none";
  container3.style.display = "none";
  switchWayById(id, way);
  updateVariablesValues();
}

function closeInfoWindows(container1, container2, container3, id, way, secondId, secondWay) {
  container1.style.display = "none";
  container2.style.display = "none";
  container3.style.display = "none";
  switchWayByIdWithTimeout(id, way, secondId, secondWay);
}