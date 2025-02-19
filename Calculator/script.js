'use strict';

document.getElementById('results').value = null;
document.getElementById('temp-results').value = null;

// Number elements
const num1El = document.querySelector('.num--1');
const num2El = document.querySelector('.num--2');
const num3El = document.querySelector('.num--3');
const num4El = document.querySelector('.num--4');
const num5El = document.querySelector('.num--5');
const num6El = document.querySelector('.num--6');
const num7El = document.querySelector('.num--7');
const num8El = document.querySelector('.num--8');
const num9El = document.querySelector('.num--9');
const num0El = document.querySelector('.num--0');

//Symbol elements
const resultEl = document.querySelector('.result');
const plusEl = document.querySelector('.plus');
const minusEl = document.querySelector('.minus');
const multiplyEl = document.querySelector('.multiply');
const divideEl = document.querySelector('.divide');
const sqrRootEl = document.querySelector('.sqrt');
const squareEl = document.querySelector('.square');
const divByOneEl = document.querySelector('.divByOne');
const percentageEl = document.querySelector('.percentage');
const backetEl = document.querySelector('.brackets');
const clearAllEl = document.querySelector('.clear');
const deleteCharEl = document.querySelector('.delete');
const reverseEl = document.querySelector('.reverse');
const dotEl = document.querySelector('.dot');

// Variables
let calcProvoked = false;
let openBracketsCounter = 0;
let numberInputed = false;
let bracketsProvoked = false;
let dotInserted = false;
let isNegative = false;
let finalValue = 0;
let symbolSwaps = {
  x: '*',
  '÷': '/',
  '%': '/100',
};
//================================//
//      Function declarations     //
//================================//

// Display selected digit(s)
const inputValue = value => {
  let heldValue = document.getElementById('temp-results');

  if (calcProvoked) {
    heldValue.value = null;
    heldValue.value += value;
    calcProvoked = false;
  } else if (heldValue.value.substring(heldValue.value.length - 1) === ')') {
    // Add multiplication if number is inputted after closing bracket
    heldValue.value += 'x' + value;
  } else {
    heldValue.value += value;
  }
  // If brackets provoked and input value is a number then proceed on closing brackets
  if (bracketsProvoked) {
    if (typeof value === 'number') numberInputed = true;
  }
  dynamicResults();
};

const symbolProvoked = function (symbol) {
  calcProvoked = false;
  switch (symbol) {
    case '+':
      updatedSymbol('+');
      break;
    case '-':
      updatedSymbol('-');

      break;
    case '÷':
      updatedSymbol('÷');
      break;
    case 'x':
      updatedSymbol('x');
      break;
    default:
      alert('Something went wrong. Please relaod the page!');
      break;
  }
};

const updatedSymbol = symbol => {
  let heldValue = document.getElementById('temp-results');
  let currentValue = document.getElementById('results');
  dotInserted = false;
  // Prevent duplicates by checking if the last character is a number or not
  if (
    isNaN(Number(heldValue.value.substring(heldValue.value.length - 1))) &&
    heldValue.value.substring(heldValue.value.length - 1) !== '%' &&
    heldValue.value.substring(heldValue.value.length - 1) !== ')' &&
    heldValue.value.substring(heldValue.value.length - 1) !== '.'
  ) {
    // Replace a symbol with another (not the same allowed)
    // Remove the last character which is the symbol
    heldValue.value = heldValue.value.slice(0, heldValue.value.length - 1);
    // Add the new symbol after the removal of the previous one
    heldValue.value += symbol;
  } else {
    /* Prevent adding a symbol without any input value by setting 0 as the 
       default value inputed when symbol is pressed before anything else */
    if (
      heldValue.value.length < 1 ||
      heldValue.value.substring(heldValue.value.length - 1) === '.'
    ) {
      alert('Incorrect format used');
    } else {
      // Add the symbol selected
      heldValue.value += currentValue.value + symbol;
    }
  }
};

// Dynamic result calculation
const dynamicResults = () => {
  let heldValue = document.getElementById('temp-results');
  /* Each time a new value is inputed its being evaluated to 
     show the result up to that point*/
  document.getElementById('results').placeholder = eval(
    heldValue.value.replace(/[x÷%]/g, m => symbolSwaps[m])
  );
};

// Delete the last inputed character
const deleteLastChar = () => {
  let heldValue = document.getElementById('temp-results');
  if (heldValue.value != '') {
    document.getElementById('temp-results').value = heldValue.value.slice(
      0,
      -1
    );
    if (heldValue.value.length === 0) {
      document.getElementById('results').placeholder = '';
    } else {
      dynamicResults();
    }
  }
};

// Delete everything and reset the calculator
const clearAll = () => {
  document.getElementById('results').value = null;
  document.getElementById('temp-results').value = null;
  numberInputed = false;
  bracketsProvoked = false;
  calcProvoked = false;
  isNegative = false;
  dotInserted = false;
  finalValue = 0;
  openBracketsCounter = 0;
  document.getElementById('results').placeholder = '';
};

// (Dynamically?) Input the precentage of a selected number
const calcPercentage = () => {
  let heldValue = document.getElementById('temp-results');
  dotInserted = false;
  if (
    heldValue.value !== '' &&
    (heldValue.value.substring(heldValue.value.length - 1) === ')' ||
      heldValue.value.substring(heldValue.value.length - 1) === '.' ||
      !isNaN(heldValue.value.substring(heldValue.value.length - 1)))
  ) {
    heldValue.value += '%';
    dynamicResults();
  } else {
    alert('Wrong format used!');
  }
};

// fix the brackets
const insBrackets = () => {
  let heldValue = document.getElementById('temp-results');
  dotInserted = false;
  if (numberInputed && bracketsProvoked && openBracketsCounter > 0) {
    // Start adding closing brackets until the counter is equal to 0 in order to reset
    if (
      heldValue.value.substring(heldValue.value.length - 1) === '+' ||
      heldValue.value.substring(heldValue.value.length - 1) === '-' ||
      heldValue.value.substring(heldValue.value.length - 1) === 'x' ||
      heldValue.value.substring(heldValue.value.length - 1) === '÷' ||
      heldValue.value.substring(heldValue.value.length - 1) === '.'
    ) {
      alert('Wrong format used!');
    } else {
      heldValue.value += ')';
      openBracketsCounter--;
    }

    if (openBracketsCounter === 0) {
      numberInputed = false;
    }
  } else {
    // Add bracket and increase counter
    if (heldValue.value.substring(heldValue.value.length - 1) !== '.') {
      if (
        heldValue.value !== '' &&
        (heldValue.value.substring(heldValue.value.length - 1) === ')' ||
          heldValue.value.substring(heldValue.value.length - 1) === '%' ||
          !isNaN(heldValue.value.substring(heldValue.value.length - 1)))
      ) {
        // Add multiplication if needed
        bracketsProvoked = true;
        heldValue.value += 'x(';
        openBracketsCounter++;
      } else {
        bracketsProvoked = true;
        heldValue.value += '(';
        openBracketsCounter++;
      }
    } else {
      alert('Wrong format used!');
    }
  }
  dynamicResults();
};

const insertDot = () => {
  let heldValue = document.getElementById('temp-results');
  if (!dotInserted) {
    if (heldValue.value.substring(heldValue.value.length - 1) !== '.') {
      if (
        heldValue.value.substring(heldValue.value.length - 1) === '%' ||
        heldValue.value.substring(heldValue.value.length - 1) === ')'
      ) {
        document.getElementById('temp-results').value += 'x0.';
      } else if (
        isNaN(heldValue.value.substring(heldValue.value.length - 1)) ||
        heldValue.value === ''
      ) {
        document.getElementById('temp-results').value += '0.';
      } else {
        document.getElementById('temp-results').value += '.';
      }
      dotInserted = true;
    }
  }
};

const reversePlusMinus = () => {
  let heldValue = document.getElementById('temp-results');
  if (!isNegative) {
    console.log('isNegative : ' + isNegative);
    bracketsProvoked = true;
    heldValue.value += '(-';
    openBracketsCounter++;
    isNegative = true;
  } else {
    console.log('isNegative : ' + isNegative);
    // heldValue.value.split('-')[1];
    heldValue.value = heldValue.value.split('-')[1];
    console.log(heldValue.value.split('-')[1]);
  }
};

const calcResult = () => {
  let heldValue = document.getElementById('temp-results');
  /* Show an alert if the user tries to evaluate while the equation is ending 
     with a symbol (allow precentage symbol) */
  if (heldValue.value === '') {
    clearAll();
  } else if (
    !isNaN(Number(heldValue.value.substring(heldValue.value.length - 1))) ||
    heldValue.value.substring(heldValue.value.length - 1) === '%' ||
    heldValue.value.substring(heldValue.value.length - 1) === ')'
  ) {
    finalValue = eval(heldValue.value.replace(/[x÷%]/g, m => symbolSwaps[m]));
    document.getElementById('results').placeholder = '';
    document.getElementById('temp-results').value = finalValue;
    calcProvoked = true;
    dynamicResults();
  } else {
    alert('Wrong format used!');
  }
};

//==============================//
//         Click events         //
//==============================//
num1El.addEventListener('click', function () {
  inputValue(1);
});
num2El.addEventListener('click', function () {
  inputValue(2);
});
num3El.addEventListener('click', function () {
  inputValue(3);
});
num4El.addEventListener('click', function () {
  inputValue(4);
});
num5El.addEventListener('click', function () {
  inputValue(5);
});
num6El.addEventListener('click', function () {
  inputValue(6);
});
num7El.addEventListener('click', function () {
  inputValue(7);
});
num8El.addEventListener('click', function () {
  inputValue(8);
});
num9El.addEventListener('click', function () {
  inputValue(9);
});
num0El.addEventListener('click', function () {
  inputValue(0);
});

clearAllEl.addEventListener('click', clearAll);
deleteCharEl.addEventListener('click', deleteLastChar);
percentageEl.addEventListener('click', calcPercentage);
dotEl.addEventListener('click', insertDot);
backetEl.addEventListener('click', insBrackets);
reverseEl.addEventListener('click', reversePlusMinus);

plusEl.addEventListener('click', function () {
  symbolProvoked('+');
});
minusEl.addEventListener('click', function () {
  symbolProvoked('-');
});
multiplyEl.addEventListener('click', function () {
  symbolProvoked('x');
});
divideEl.addEventListener('click', function () {
  symbolProvoked('÷');
});
resultEl.addEventListener('click', calcResult);
