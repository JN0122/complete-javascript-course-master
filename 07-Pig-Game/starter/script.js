'use strict';

const diceEl = document.querySelector('.dice');
const rollEl = document.querySelector('.btn--roll');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const holdEl = document.querySelector('.btn--hold');
const newGameEl = document.querySelector('.btn--new');

let scores = [0, 0];
let isGameActive = true;
let currentScore = 0;
let activePlayer = 0;
let winnerScore = 100;

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
};

const updateActivePlayerScore = function () {
  if (activePlayer) {
    currentScore1El.textContent = 0;
    score1El.textContent = scores[1];
  } else {
    currentScore0El.textContent = 0;
    score0El.textContent = scores[0];
  }
};

const updateActivePlayerCurrentScore = function () {
  if (activePlayer) {
    currentScore1El.textContent = currentScore;
  } else {
    currentScore0El.textContent = currentScore;
  }
};

rollEl.addEventListener('click', () => {
  if (isGameActive) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      updateActivePlayerCurrentScore();
    } else {
      currentScore = 0;
      updateActivePlayerScore();
      switchPlayer();
    }
  }
});

holdEl.addEventListener('click', () => {
  if (isGameActive) {
    scores[activePlayer] += currentScore;
    updateActivePlayerScore();

    if (scores[activePlayer] >= winnerScore) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      isGameActive = false;
    } else {
      console.log('swiched');
      switchPlayer();
      currentScore = 0;
    }
  }
});

newGameEl.addEventListener('click', () => {
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');

  diceEl.classList.add('hidden');

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  isGameActive = true;
});
