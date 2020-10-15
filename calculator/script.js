// Search by DOM
const numbers = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.operations');
const dot = document.getElementById('dot');
const square = document.getElementById('square');
const clearAll = document.getElementById('clear-c');
const clearBackspace = document.getElementById('clear-ce');
const display = document.getElementById('display');
const memory = document.getElementById('current-calculations');
const negativeSign = document.getElementById('negative-sign');
const helpButton = document.querySelector('.help');
const descriptionInfo = document.querySelector('.description');

// Current variables
let memoryCurrentNumber = 0;
let memoryNextNumber = false;
let memoryPendingOperator = '';

// Functions
const numberPress = (num) => {
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
};

const operationPress = (operator) => {
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
      }
    } else if (memoryPendingOperator === '^') {
      memoryCurrentNumber = parseFloat(Math.pow(memoryCurrentNumber, localNumberOfOperatorMemory));
    } else memoryCurrentNumber = parseFloat(localNumberOfOperatorMemory);

    if (memoryCurrentNumber === Infinity) {
      display.value = 'division by zero';
      memory.textContent = 'error';
    } else {
      display.value = Math.round(memoryCurrentNumber * 10000) / 10000;
    }
    memoryPendingOperator = operator;
  }
};

const dotPress = (e) => {
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
  memory.textContent += '.';
};

const squarePress = (e) => {
  if (display.value >= 0) {
    display.value = parseFloat(Math.sqrt(display.value));
    memory.textContent += e.target.value;
  } else {
    display.value = 'root of a negative number';
    memory.textContent = 'error';
  }
};

const negativeSignPress = (e) => {
  if (display.value[0] === '-') {
    display.value = display.value.slice(1);
  } else {
    display.value = '-' + display.value;
    memory.textContent += '-';
  }
};

const clearAllPress = (e) => {
  memoryCurrentNumber = 0;
  display.value = 0;
  memory.textContent = '';
};

const clearBackspacePress = (e) => {
  let displayValue = display.value;
  display.value = displayValue.slice(0, -1);
  if (display.value.length === 0) {
    display.value = 0;
  } else {
    memoryCurrentNumber = parseFloat(display.value);
    memoryNextNumber = false;
  }
};

// Handlers of mouse
helpButton.addEventListener('click', () => {
  helpButton.classList.toggle('light');
  descriptionInfo.classList.toggle('visibility');
});

for (let number of numbers) {
  number.addEventListener('click', (e) => {
    let targetNumber = e.target.value;
    memory.textContent += e.target.value;
    numberPress(targetNumber);
  });
}

for (let operation of operations) {
  operation.addEventListener('click', (e) => {
    let targetOperation = e.target.value;
    memory.textContent += e.target.value;
    operationPress(targetOperation);
  });
}

dot.addEventListener('click', dotPress);
square.addEventListener('click', squarePress);
negativeSign.addEventListener('click', negativeSignPress);
clearAll.addEventListener('click', clearAllPress);
clearBackspace.addEventListener('click', clearBackspacePress);

// KeyBoard

const keyNumbers = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
const keyOperations = [106, 107, 109, 111];

// Handlers of keyBoard
document.addEventListener('keydown', (e) => {
  keyNumbers.forEach((key) => {
    if (key === e.keyCode) {
      let targetKeyBoardNumber = e.key;
      memory.textContent += e.key;
      numberPress(targetKeyBoardNumber);
    }
  });
});

document.addEventListener('keydown', (e) => {
  keyOperations.forEach((key) => {
    if (key === e.keyCode) {
      let targetKeyBoardOperation = e.key;
      memory.textContent += e.key;
      operationPress(targetKeyBoardOperation);
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    memory.textContent += '=';
    operationPress();
  }

  if (e.keyCode === 27) {
    clearAllPress();
  }

  if (e.keyCode === 110) {
    dotPress();
  }

  if (e.keyCode === 8) {
    clearBackspacePress();
  }
});
