'use strict';

const clickButtonSound = document.querySelector("#clickSound");

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