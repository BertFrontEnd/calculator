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
        memoryCurrentNumber = 'division by zero';
        memory.textContent = 'error';
      }
    } else if (memoryPendingOperator === '^') {
      memoryCurrentNumber = parseFloat(Math.pow(memoryCurrentNumber, localNumberOfOperatorMemory));
    } else memoryCurrentNumber = parseFloat(localNumberOfOperatorMemory);

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
  memory.textContent += '.';
};

/* const squarePress = (e) => {
  display.value = parseFloat(Math.sqrt(display.value));
  memory.textContent += e.target.value;
}; */

/* const squarePress = (e) => {
  display.value = parseFloat(Math.sqrt(display.value));
  if (display.value >= 0) {
    memory.textContent += e.target.value;
  } else {
    memory.textContent = 'error: root of a negative number';
  }
}; */

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
    return display.value;
  } else {
    display.value = '-' + display.value;
  }
  memory.textContent = '-' + memory.textContent;
};

const clearAllPress = (e) => {
  console.log('Клик по "C"');
  memoryCurrentNumber = 0;
  display.value = 0;
  memory.textContent = '';
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

// Handlers of mouse
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

const keyNumbers = [/* 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, */ 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
const keyOperations = [106, 107, 109, 111 /* , 187, 189 */];

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
    operationPress('=');
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
