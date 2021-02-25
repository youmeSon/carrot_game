'use strict';

const playBtn = document.querySelector('.play');
const bgAudio = new Audio('sound/bg.mp3');
const timer = document.querySelector('.timer');
const result = document.querySelector('.result');
const popUpResult = document.querySelector('.popup');

function onPlay () {
  //1. music on 
  bgAudio.play(); 
 // change to the pause button
  playBtn.innerHTML = `<i class="fas fa-stop" data-id="stopMusic"></i>`;
  //2. timer start 
  onTimer();
  //3. bugs & carrot appear
  //4. count start
}
function onStop () {
  bgAudio.pause();
}

// timer function 
let timeLeft = 10;
function onTimer() {
  const countdownTimer = setInterval(function() {
    if(timeLeft <= 0) {
      clearInterval(countdownTimer);
      popUpResult.classList.add('active');
      result.textContent = `You Failed!❌`;
    }
    timer.textContent = `0:${timeLeft}`;
    timeLeft -= 1;
  }, 1000);  
};


// add bugs and carrots 
const gameField = document.querySelector('.gameField');
let carrotNum = 0;
function createCarrot () {
  const newCarrot = document.createElement('');
  newCarrot.innerHTML = `<img id="carrot" src="img/carrot.png" alt="carrot" data-carrotNum="${carrotNum}">`;
  carrotNum++;
  gameField.appendChild(newCarrot);
}

let bugNum = 0;
function createBug () {
  const newBug = document.createElement('img');
  newBug.innerHTML = `<img id="bug" src="img/bug.png" alt="bug" data-num="${bugNum}">`;
  bugNum++;
  gameField.appendChild(newBug);
}
  

// Event Listener 
playBtn.addEventListener('click', (e) => {
  if(e.target.dataset.id === "stopMusic") {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    onStop();
  } else{
    onPlay();
  }

  createBug();
  createCarrot();
});

