'use strict';

const rollBtn = document.querySelector('.rollDice-btn');
const resultInput = document.querySelector('.diceResults');
const diceEl = document.querySelector('.dice');
const dice2El = document.querySelector('.dice2');

diceEl.classList.add('hidden');
dice2El.classList.add('hidden');

const rollDiceOne = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

const rollDiceTwo = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

const displayDice1 = dice => {
  diceEl.classList.remove('hidden');
  diceEl.src = `dice/dice-${dice}.png`;
};

const displayDice2 = dice => {
  dice2El.classList.remove('hidden');
  dice2El.src = `dice/dice-${dice}.png`;
};

rollBtn.addEventListener('click', function () {
  let dice1 = rollDiceOne();
  let dice2 = rollDiceTwo();
  while (dice1 === dice2) {
    dice2 = rollDiceTwo();
  }

  displayDice1(dice1);

  displayDice2(dice2);
});
