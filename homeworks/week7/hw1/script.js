const wrapper = document.querySelector('.wrapper');
const btnReset = document.querySelector('.btn__reset');
let time = 0;
let goTime = null;
let goTimeout = null;
let endScore = 0;
const bestScores = [0, 0, 0];

function bestScore() {
  for (let i = 0; i < bestScores.length; i += 1) {
    if (bestScores[i] === 0) {
      bestScores.splice(i, 1, endScore);
      endScore = 0;
    }
    if (endScore < bestScores[i] && endScore !== 0) {
      bestScores.splice(i, 0, endScore);
      bestScores.pop();
      endScore = 0;
    }
    if (bestScores[i] !== 0) {
      const record = document.querySelector(`.record${i}`);
      record.innerText = `${i + 1}. ${bestScores[i]} 秒`;
      record.classList.add('visible');
    }
  }
}

function endFn() {
  if (time > 0) {
    time = (time / 100).toFixed(2);
    alert(`${time} 秒`);
    clearInterval(goTime);
    btnReset.classList.add('active');
    wrapper.removeEventListener('click', endFn);
  } else {
    alert('還沒變色喔，失敗');
    wrapper.removeEventListener('click', endFn);
    clearTimeout(goTimeout);
    btnReset.classList.add('active');
  }

  endScore = time;
  if (endScore > 0) {
    bestScore();
  }
}

function setTime() {
  goTime = setInterval(() => {
    time += 1;
  }, 10);
}

function start() {
  const startTime = Math.ceil(Math.random() * 2000) + 1000;
  const colorCode = 'abcdef1234567890';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    const number = Math.floor(Math.random() * color.length);
    color += colorCode[number];
  }
  goTimeout = setTimeout(() => {
    setTime();
    wrapper.style.backgroundColor = color;
  }, startTime);
}

function resetFn(e) {
  time = 0;
  btnReset.classList.remove('active');
  wrapper.style.backgroundColor = '#fff';
  start();
  wrapper.addEventListener('click', endFn);
  e.stopPropagation();
}

wrapper.addEventListener('click', endFn);
btnReset.addEventListener('click', resetFn);
window.addEventListener('keydown', (e) => {
  if (e.key === ' ' && !btnReset.classList.contains('active')) {
    endFn();
  }
  if (e.key === 'r' && btnReset.classList.contains('active')) {
    resetFn();
  }
});

start();
