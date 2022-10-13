'use strict';
//All elements 
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// const activePlayer = document.querySelector('.player');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer == 0 ? 1 : 0;
   player0EL.classList.toggle('player--active');
   player1EL.classList.toggle('player--active');
}
//implementing the rolling dice functionality
btnRoll.addEventListener('click', function () {
   if (playing) {
      //step 1 generate a random dice 
      const dice = Math.trunc(Math.random() * 6) + 1;
      //step 2 Display that role 
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
      //step 3 Check the dice role is 1 : if true , change to another player
      if (dice !== 1) {
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      } else { //here we alreday switching player
         switchPlayer();
      }
   }

});

btnHold.addEventListener('click', function () {
   if (playing) {
      //Add the score to active player
      scores[activePlayer] += currentScore; //scores[1] = scores[1]+currentScore
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
      //check if the  players score >=100
      if (scores[activePlayer] >= 20) {
         playing = false;
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      } else {
         //Switch to next player
         switchPlayer();
      }
   }
});
