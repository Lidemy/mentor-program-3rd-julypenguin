const inputBox = document.querySelectorAll('.inputBox');
const radioBox = document.querySelectorAll('.inputBox__radio');
let boxes = null;
let finalChecked = 0;

function domRender(fnThis) {
  const div = document.createElement('footer');
  div.classList.add(`necessary__${fnThis.name}`);
  div.innerText = '這是必填問題';
  boxes = document.querySelector(`.${fnThis.name}Box`);
  boxes.appendChild(div);
  boxes.style.backgroundColor = '#fce8e6';
  document.querySelector(`#${fnThis.id}`).style.backgroundColor = '#fce8e6';
}

function removeDOM(fnThis) {
  boxes = document.querySelector(`.${fnThis.name}Box`);
  boxes.removeChild(document.querySelector(`.${fnThis.name}Box > footer`));
  boxes.style.backgroundColor = '#fff';
}

function checked() {
  if (
    !this.value
    && !document.querySelector(`.necessary__${this.name}`)
    && document.querySelector(`.${this.name}Star`)
  ) {
    domRender(this);
  } else if (this.value && document.querySelector(`.necessary__${this.name}`)) {
    removeDOM(this);
  }
}

for (let i = 0; i < inputBox.length; i += 1) {
  inputBox[i].addEventListener('blur', checked);
}

const submitBox = document.querySelector('.form');
submitBox.addEventListener('submit', (e) => {
  finalChecked = 0;
  for (let i = 0; i < inputBox.length - 1; i += 1) {
    if (
      !inputBox[i].value
      && !document.querySelector(`.necessary__${inputBox[i].name}`)
    ) {
      finalChecked += 1;
      domRender(inputBox[i]);
    }
    if (document.querySelector(`.necessary__${inputBox[i].name}`)) {
      finalChecked += 1;
    }
  }
  if (finalChecked > 0) {
    alert('資料還沒填完唷!');
    e.preventDefault();
  } else {
    alert('提交成功!');
    const dataTitle = [
      '電子郵件地址',
      '暱稱',
      '現在職業',
      '怎麼知道計畫',
      '程式相關背景',
      '其他',
      '報名類型',
    ];
    const data = {};
    for (let i = 0; i < inputBox.length; i += 1) {
      data[dataTitle[i]] = inputBox[i].value;
    }
    for (let i = 0; i < radioBox.length; i += 1) {
      if (radioBox[i].checked === true) {
        data[dataTitle[6]] = i;
      }
    }
    console.log(data);
  }
});
