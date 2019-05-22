const request = new XMLHttpRequest();
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const textBox = document.querySelector('.textBox');
const imgBoxFit = document.querySelector('.imgBox__fit');
const bgc = document.querySelector('.wrapper');
const btn = document.querySelector('.btn');
let text = '';
const h2 = document.createElement('h2');
h2.classList.add('text');

request.addEventListener('load', () => {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText;
    const json = JSON.parse(response);
    let imgSrc = '';

    switch (json.prize) {
      case 'FIRST':
        text = '恭喜你中頭獎了！日本東京來回雙人遊！';
        imgSrc = 'https://images.pexels.com/photos/67807/plane-aircraft-take-off-sky-67807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
        bgc.classList.add('first');
        break;
      case 'SECOND':
        text = '二獎！90 吋電視一台！';
        imgSrc = 'https://images.unsplash.com/photo-1540300512726-61873b2c627d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80';
        bgc.classList.add('second');
        break;
      case 'THIRD':
        text = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        imgSrc = './youtube.jpg';
        bgc.classList.add('third');
        break;
      case 'NONE':
        text = '銘謝惠顧';
        imgSrc = './again.jpg';
        bgc.classList.add('none');
        btn.classList.add('none');
        break;
      default:
    }
    h2.innerText = text;
    textBox.appendChild(h2);
    imgBoxFit.innerHTML = `<img class="image" src="${imgSrc}" />`;
  } else {
    text = '請再按一次';
    h2.innerText = text;
    textBox.appendChild(h2);
    alert('系統不穩定，請再試一次');
  }
});

function reset() {
  textBox.removeChild(document.querySelector('.text'));
  imgBoxFit.innerHTML = '<img class="image" src="./Blocks-0.6s-200px_black.gif" />';
  switch (bgc.classList[1]) {
    case 'first':
      bgc.classList.remove('first');
      break;
    case 'second':
      bgc.classList.remove('second');
      break;
    case 'third':
      bgc.classList.remove('third');
      break;
    case 'none':
      bgc.classList.remove('none');
      btn.classList.remove('none');
      break;
    default:
  }
}

btn.addEventListener('click', () => {
  reset();
  setTimeout(() => {
    request.open('GET', url, true);
    request.send();
  }, 1000);
});
