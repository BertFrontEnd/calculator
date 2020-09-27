// Search by DOM
let numbers = document.querySelectorAll('.num');
let operations = document.querySelectorAll('.operations');
let exponent = document.getElementById('exponent');
let dot = document.getElementById('dot');
let square = document.getElementById('square');
let clearAll = document.getElementById('clear-c');
let clearBackspace = document.getElementById('clear-ce');
let display = document.getElementById('display');
let memory = document.getElementById('current-calculations');

// Current variables
let memoryCurrentNumber = 0;
let memoryNextNumber = false;
let memoryPendingOperator = '';

// Functions
const numberPress = (num) => {
  console.log(`Клик по number ${num}`);

  if (memoryNextNumber) {
    display.value = num;
    memoryNextNumber = false;
  } else {
    if (display.value == '0') {
      display.value = num;
    } else {
      display.value += num;
    }
  }

  /* if (memoryNextNumber) {
    display.value = num;
    memoryNextNumber = false;
  } else {
    switch (display.value === '0') {
      case true:
        display.value = num;
        break;
      case false:
        display.value += num;
    }
  } */
};

const operationPress = (operator) => {
  console.log(`Клик по operation ${operator}`);
  let localOperatorMemory = display.value;

  if (memoryNextNumber && memoryPendingOperator !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNextNumber = true;

    if (memoryPendingOperator === '+') {
      memoryCurrentNumber += parseFloat(localOperatorMemory);
    } else if (memoryPendingOperator === '-') {
      memoryCurrentNumber -= parseFloat(localOperatorMemory);
    } else if (memoryPendingOperator === '*') {
      memoryCurrentNumber *= parseFloat(localOperatorMemory);
    } else if (memoryPendingOperator === '/') {
      memoryCurrentNumber /= parseFloat(localOperatorMemory);
    } else memoryCurrentNumber = parseFloat(localOperatorMemory);

    /* switch (memoryNextNumber) {
      case memoryPendingOperator === '+':
        memoryCurrentNumber += parseFloat(localOperatorMemory);
        break;
      case memoryPendingOperator === '-':
        memoryPendingOperator -= parseFloat(localOperatorMemory);
        break;
      case memoryPendingOperator === '*':
        memoryPendingOperator *= parseFloat(localOperatorMemory);
        break;
      case memoryPendingOperator === '/':
        memoryPendingOperator /= parseFloat(localOperatorMemory);
        break;

      default:
        memoryCurrentNumber = localOperatorMemory;
    } */

    display.value = memoryCurrentNumber;
    memoryPendingOperator = operator;
  }
};

const dotPress = (e) => {
  console.log('Клик по "."');
  let localDecimalMemory = display.value;

  if (memoryNextNumber) {
    localDecimalMemory = '0.';
    memoryNextNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }

  display.value = localDecimalMemory;
};

const exponentPress = (e) => {
  console.log('Клик по "X*2"');
  display.value = Math.pow(display.value, 2);
};

const squarePress = (e) => {
  display.value = Math.sqrt(display.value);
};

const clearAllPress = (e) => {
  console.log('Клик по "C"');
  memoryCurrentNumber = 0;
  display.value = 0;
};

const clearBackspacePress = (e) => {
  console.log('Клик по "Backspace"');
  let displayValue = display.value;
  display.value = displayValue.split('').slice(0, -1).join('');
  if (display.value.length === 0) {
    display.value = 0;
  }
};

// Handlers
for (let number of numbers) {
  number.addEventListener('click', (e) => {
    let targetNumber = e.target.value;
    numberPress(targetNumber);
  });
}

for (let operation of operations) {
  operation.addEventListener('click', (e) => {
    let targetOperation = e.target.value;
    operationPress(targetOperation);
  });
}

dot.addEventListener('click', dotPress);

exponent.addEventListener('click', exponentPress);

square.addEventListener('click', squarePress);

clearAll.addEventListener('click', clearAllPress);

clearBackspace.addEventListener('click', clearBackspacePress);
