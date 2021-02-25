'use strict';



const playBtn = document.querySelector('.play');
const timer = document.querySelector('.timer');
const result = document.querySelector('.result');
const popUpResult = document.querySelector('.popup');
const replayBtn = document.querySelector('.replay');

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
  //2. timer start && start to count down carrots
  counterRunning = true;
  onTimer();
  
  //3. bugs & carrot appear
  generateCarrot();
  generateBug();

  // 4. click carrots and disappear
  const carrot = document.querySelector('.carrot');
    document.addEventListener('click', e => {
      const id = e.target.dataset.id;
      if(id) {
        const selectedCarrot = document.querySelector(`.carrot[data-id="${id}"]`);
        selectedCarrot.remove();
      }
    })
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
const gameField = document.querySelector('.gameField');
let top_position;
let left_position;
let carrotNum = 0;
let bugNum = 13;
function generateCarrot() {
  for(let i = 0; i < 10; i++) {
    top_position = getRandomInt(55, 90);
    left_position = getRandomInt(0, 95);
    createImages("carrot", "img/carrot.png", i, top_position, left_position);
    carrotNum ++;
  }
}
function generateBug() {
  for(let j = 0; j < 13; j++) {
    top_position = getRandomInt(55, 90);
    left_position = getRandomInt(0, 95);
    createImages("bug", "img/bug.png", j, top_position, left_position);
    bugNum ++;
  }
}

function createImages(imageType, imgURL, index, top, left) {
  const newName = document.createElement('div');
  newName.innerHTML = `<img class="${imageType}" src="${imgURL}" alt="${imageType}" data-id="${imageType + "-" + index}">`;;
  newName.style.position = 'absolute';
  newName.style.top = `${top}%`;
  newName.style.left = `${left}%`;
  gameField.appendChild(newName);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//carrot number 
const carrotCount = document.querySelector('.carrotCount');
carrotCount.textContent = `${carrotNum}`;





// Event Listener 
playBtn.addEventListener('click', (e) => {
  if(e.target.dataset.id === "stopMusic") {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    gameOver("Replay❓"); 
  } else{
    onPlay();
    carrotCount.textContent = `${carrotNum}`;
    
  }

});

replayBtn.addEventListener('click', () => {
  location.reload();
});

