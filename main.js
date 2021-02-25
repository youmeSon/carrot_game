'use strict';

const playBtn = document.querySelector('.play');
const timer = document.querySelector('.timer');
const result = document.querySelector('.result');
const popUpResult = document.querySelector('.popup');

//timer counter

let counterInterval = null;
let counter = 10;
let counterRunning = false;

// sounds 
const bgAudio = new Audio('sound/bg.mp3');
const failAudio = new Audio('sound/alert.wav');
const bugPullAudio = new Audio('sound/bug_pull.mp3');
const carrotPullAudio = new Audio('sound/carrot_pull.mp3');
const winAudio = new Audio('sound/game_win.mp3');

function gameOver(messageText){
  bgAudio.pause();
  failAudio.play();
  playBtn.classList.add('active');
  popUpResult.classList.add('active');
  result.textContent = messageText;
  counterRunning = false;
  clearInterval(counterInterval);
}


function onPlay() {
  //1. music on 
  bgAudio.play(); 
 // change to the pause button
  playBtn.innerHTML = `<i class="fas fa-stop" data-id="stopMusic"></i>`;
  //2. timer start
  counterRunning = true;
  onTimer();
  //3. bugs & carrot appear
  //4. count start
}

// timer function 
function onTimer() {
  counterInterval = setInterval(function() {
    incrementCounter();
  }, 1000);  
};

function incrementCounter(){
  if(counter > 0 && counterRunning){
    counter--;
    timer.textContent = `0:${(counter > 9 ? counter : "0" + counter)}`;
  } else if(counter == 0){
    clearInterval(counterInterval);
    gameOver("You Failed!❌");
  }
};


// add bugs and carrots 
// const gameField = document.querySelector('.gameField');
// let carrotNum = 0;
// function createCarrot() {
//   const newCarrot = document.createElement('');
//   newCarrot.innerHTML = `<img id="carrot" src="img/carrot.png" alt="carrot" data-carrotNum="${carrotNum}">`;
//   carrotNum++;
//   gameField.appendChild(newCarrot);
// }

// let bugNum = 0;
// function createBug() {
//   const newBug = document.createElement('img');
//   newBug.innerHTML = `<img id="bug" src="img/bug.png" alt="bug" data-num="${bugNum}">`;
//   bugNum++;
//   gameField.appendChild(newBug);
// }
  

// Event Listener 
playBtn.addEventListener('click', (e) => {
  if(e.target.dataset.id === "stopMusic") {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    gameOver("Replay❓"); 
  } else{
    onPlay();
  }

  // createBug();
  // createCarrot();
});

