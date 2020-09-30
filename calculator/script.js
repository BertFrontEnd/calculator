// Search by DOM
let numbers = document.querySelectorAll('.num');
let operations = document.querySelectorAll('.operations');
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
  let localNumberOfOperatorMemory = display.value;

  if (memoryNextNumber && memoryPendingOperator !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNextNumber = true;

    if (memoryPendingOperator === '+') {
      memoryCurrentNumber += parseFloat(localNumberOfOperatorMemory);
    } else if (memoryPendingOperator === '-') {
      memoryCurrentNumber -= parseFloat(localNumberOfOperatorMemory);
    } else if (memoryPendingOperator === '*') {
      memoryCurrentNumber *= parseFloat(localNumberOfOperatorMemory);
    } else if (memoryPendingOperator === '/') {
      memoryCurrentNumber /= parseFloat(localNumberOfOperatorMemory);
      if (localNumberOfOperatorMemory === '0') {
        memoryCurrentNumber = 'error: division by zero';
      }
    } else if (memoryPendingOperator === 'pow') {
      memoryCurrentNumber = parseFloat(Math.pow(memoryCurrentNumber, localNumberOfOperatorMemory));
    } else memoryCurrentNumber = parseFloat(localNumberOfOperatorMemory);

    /* switch (memoryNextNumber) {
      case memoryPendingOperator === '+':
        memoryCurrentNumber += parseFloat(localNumberOfOperatorMemory);
        break;
      case memoryPendingOperator === '-':
        memoryPendingOperator -= parseFloat(localNumberOfOperatorMemory);
        break;
      case memoryPendingOperator === '*':
        memoryPendingOperator *= parseFloat(localNumberOfOperatorMemory);
        break;
      case memoryPendingOperator === '/':
        memoryPendingOperator /= parseFloat(localNumberOfOperatorMemory);
        break;

      default:
        memoryCurrentNumber = localNumberOfOperatorMemory;
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

const squarePress = (e) => {
  display.value = parseFloat(Math.sqrt(display.value));
};

const clearAllPress = (e) => {
  console.log('Клик по "C"');
  memoryCurrentNumber = 0;
  display.value = 0;
};

const clearBackspacePress = (e) => {
  console.log('Клик по "Backspace"');
  let displayValue = display.value;
  display.value = displayValue.slice(0, -1);
  if (display.value.length === 0) {
    display.value = 0;
  } else {
    memoryCurrentNumber = parseFloat(display.value);
    memoryNextNumber = false;
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

square.addEventListener('click', squarePress);

clearAll.addEventListener('click', clearAllPress);

clearBackspace.addEventListener('click', clearBackspacePress);
