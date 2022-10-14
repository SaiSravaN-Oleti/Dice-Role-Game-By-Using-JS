'use strict';
//All elements 
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//variables
let scores, currentScore, activePlayer, playing;


const init = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   score0El.textContent = 0;
   score1El.textContent = 0;
   current0El.textContent = 0;
   current1El.textContent = 0;
   //removing the  winner class from the players
   diceEl.classList.add('hidden');
   player0EL.classList.remove('player--winner');
   player1EL.classList.remove('player--winner');
   player0EL.classList.add('player--active');
   player1EL.classList.remove('player--active');
}
init();


const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer == 0 ? 1 : 0;
   player0EL.classList.toggle('player--active');
   player1EL.classList.toggle('player--active');
}

//Working on Role dice button
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

//working on hold button
btnHold.addEventListener('click', function () {
   if (playing) {
      //Add the score to active player
      scores[activePlayer] += currentScore; //scores[1] = scores[1]+currentScore
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
      //check if the  players score >=100
      if (scores[activePlayer] >= 20) {
         playing = false;
         diceEl.classList.add('hidden');
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      } else {
         //Switch to next player
         switchPlayer();
      }
   }
});

//working to reset new game button
btnNew.addEventListener('click', init);