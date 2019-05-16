const result = document.querySelector('header');
const equal = document.querySelector('.equal');
const ADD = 1;
const SUB = 2;
const MUL = 3;
const DIV = 4;
let operation = null;
let calcStart = 0;
let calcEnd = 0;
let clearView = true;

document.querySelector('.ul').addEventListener('click', (e) => {
  if (e.target.classList.contains('number')) {
    if (result.innerText === '0' || clearView) {
      result.innerText = e.target.id;
      clearView = false;
    } else {
      result.innerText += e.target.id;
    }
  } else if (e.target.classList.contains('operation')) {
    calcStart = Number(result.innerText);
    clearView = true;
    switch (e.target.id) {
      case 'addition':
        operation = ADD;
        break;
      case 'subtraction':
        operation = SUB;
        break;
      case 'multiplication':
        operation = MUL;
        break;
      case 'division':
        operation = DIV;
        break;
      default:
    }
  } else if (e.target.classList.contains('ac')) {
    result.innerText = 0;
    operation = null;
  }
});

equal.addEventListener('click', () => {
  calcEnd = Number(result.innerText);
  clearView = true;
  switch (operation) {
    case ADD:
      result.innerText = Math.floor((calcStart + calcEnd) * 10) / 10;
      break;
    case SUB:
      result.innerText = Math.floor((calcStart - calcEnd) * 10) / 10;
      break;
    case MUL:
      result.innerText = Math.floor(calcStart * calcEnd * 10) / 10;
      break;
    case DIV:
      result.innerText = Math.floor((calcStart / calcEnd) * 10) / 10;
      break;
    default:
  }
});
