'use strict';

// Selecting the element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
// debugger;

let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // playing = true;
  //   activePlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const Switch = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// the rolling dice functionality
btnRoll.addEventListener('click', () => {
  // 1. Generating a random dice roll

  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    // console.log(activePlayer);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      Switch();
    }
  }
});

btnHold.addEventListener('click', () => {
  // 1. add current score to active player's score
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. check if player's score is >= 100
    if (score[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch
      Switch();
    }
  }
});

btnNew.addEventListener('click', init);

// const numberOfPlayer = 2;
// let isPlaying = true;
// const winnigScore = 20;

// // Select elements
// const scoreEls = document.querySelectorAll('.score');
// const diceEl = document.querySelector('.dice');
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');
// const currScoreEls = document.querySelectorAll('.current-score');

// // function to set game to starting conditions
// function resetGame() {
//   isPlaying = true;
//   for (let element of scoreEls) element.textContent = 0;
//   diceEl.classList.add('hidden');
//   for (let element of currScoreEls) element.textContent = 0;

//   // reset active player to player--0
//   let i = 0;
//   document.querySelector(`.player--${i++}`).classList.add('player--active');
//   for (; i < numberOfPlayer; i++)
//     document.querySelector(`.player--${i}`).classList.remove('player--active');
// }

// resetGame();

// // "roll a die" function return the rolled number (from 1 to 6)
// function rollADie() {
//   if (isPlaying) {
//     const randomNumber = Math.trunc(Math.random() * 6 + 1);
//     // console.log(`rolled number ${randomNumber}`);

//     //display the die image corresponding to the rolled number
//     let text = 'dice-' + randomNumber + '.png';
//     diceEl.src = text;
//     diceEl.classList.remove('hidden');

//     return randomNumber;
//   } else return 0;
// }

// // Get the active player number return 0 for 1st player and 1 for 2nd player
// function getActivePlayerNumber() {
//   const playerEls = document.querySelectorAll('.player');
//   let i = 0;
//   for (; i < playerEls.length; i++) {
//     if (playerEls[i].classList.contains('player--active')) break;
//   }
//   return i;
// }

// // function to switch player
// function switchPlayer() {
//   let i = getActivePlayerNumber();

//   let activePlayerEl = document.querySelector(`.player--${i}`);
//   activePlayerEl.classList.remove('player--active');
//   activePlayerEl.querySelector('.current-score').textContent = 0;

//   let nextActivePlayerNumber = (i + 1) % numberOfPlayer;
//   let otherPlayer = document.querySelector(
//     `.player--${nextActivePlayerNumber}`
//   );
//   otherPlayer.classList.add('player--active');
// }

// // function to add rolled number to current socre of active player
// function addToCurrentScore(rolledNumber) {
//   let i = getActivePlayerNumber();
//   let activePlayerEl = document.querySelector(`.player--${i}`);
//   let currentScore = Number(
//     activePlayerEl.querySelector('.current-score').textContent
//   );
//   // console.log(`current score ${activePlayerEl.querySelector('.current-score').textContent}`);
//   activePlayerEl.querySelector('.current-score').textContent =
//     currentScore + rolledNumber;
// }

// // add click listener to roll button
// btnRoll.addEventListener('click', function () {
//   let rolledNumber = rollADie();

//   if (rolledNumber === 1) switchPlayer();
//   else {
//     addToCurrentScore(rolledNumber);
//   }
// });

// // add click listener to new game button
// btnNew.addEventListener('click', resetGame);

// // add click listener to the hold buttn
// btnHold.addEventListener('click', function () {
//   if (isPlaying) {
//     let i = getActivePlayerNumber();
//     let activePlayerEl = document.querySelector(`.player--${i}`);
//     let activeCurrentScore = Number(
//       activePlayerEl.querySelector('.current-score').textContent
//     );
//     let activeScore = Number(
//       activePlayerEl.querySelector('.score').textContent
//     );
//     activePlayerEl.querySelector('.score').textContent =
//       activeCurrentScore + activeScore;

//     if (activeCurrentScore + activeScore < winnigScore) {
//       switchPlayer();
//     } else {
//       isPlaying = false;
//       diceEl.classList.add('hidden');
//     }
//   }
// });
