'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const Game = {
  setMessage: function (messageText) {
    document.querySelector('.message').textContent = messageText;
    return this;
  },
  setNumber: function (numberValue) {
    document.querySelector('.number').textContent = numberValue;
    return this;
  },
  setNumberWidth: function (widthValue) {
    document.querySelector('.number').style.width = widthValue;
    return this;
  },
  setBodyColor: function (colorValue) {
    document.querySelector('body').style.backgroundColor = colorValue;
    return this;
  },
  setHighscore: function (highscoreValue) {
    document.querySelector('.highscore').textContent = highscoreValue;
    return this;
  },
  setScore: function (scoreValue) {
    document.querySelector('.score').textContent = scoreValue;
    return this;
  },
  removeGuessValue: function () {
    document.querySelector('.guess').value = '';
    return this;
  },
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    Game.setMessage('🚫 Not a number ');
  } else if (guess === secretNumber) {
    Game.setMessage('🎉 Correct number!')
      .setNumber(secretNumber)
      .setNumberWidth('30rem')
      .setBodyColor('#60b347');
    if (score > highscore) {
      highscore = score;
      Game.setHighscore(highscore);
    }
  } else if (guess !== secretNumber) {
    if (score >= 1) {
      Game.setMessage(guess > secretNumber ? 'To high!' : 'To low!').setScore(
        --score
      );
    }
  }

  if (score < 1) {
    Game.setMessage('💥 You lost the game!');
  }
});

document.querySelector('.again').addEventListener('click', () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  Game.setMessage('Start guessing...')
    .setBodyColor('#222')
    .setNumber('?')
    .setNumberWidth('15rem')
    .setScore(score)
    .removeGuessValue();
});
