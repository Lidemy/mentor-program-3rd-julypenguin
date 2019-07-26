import './style.sass';
import './normalize.scss';

const request = new XMLHttpRequest();
const url = 'https://api.twitch.tv/kraken/streams/?client_id=';
const id = 'a52jzuqluym2nwkx9hpl1y5ptv20vv';
let game = 'League%20of%20Legends';
const limit = 20;
let page = 1;
let offset = 0;
let wheel = true;

function requestFn() {
  request.open(
    'GET',
    `${url}${id}&game=${game}&limit=${limit}&offset=${offset}`,
  );
  request.send();
}

function domRender(data) {
  data.streams.forEach((value, index) => {
    let videoBox = '';
    videoBox = `
  <a href="${data.streams[index].channel.url}" class="videoBox">
    <div class="videoImg__inner">
      <div class="videoImg__fit">
        <img
          src="${data.streams[index].preview.medium}"
        />
      </div>
    </div>
    <div class="userInfo">
      <div class="logoBox">
        <div class="logbox__inner">
          <div class="logobox__fit">
            <img
              src="${data.streams[index].channel.logo}"
            />
          </div>
        </div>
      </div>
      <div class="roomInfo">
        <div class="status">${data.streams[index].channel.status}</div>
        <div class="name">${data.streams[index].channel.name}</div>
      </div>
    </div>
  </a>
  `;
    document.querySelector('.streams').innerHTML += videoBox;
  });
}

function removeBtn(data) {
  if (data.streams.length < limit) {
    document.querySelector('.footer').innerHTML = '';
  }
}

function removeDom() {
  document.querySelector('.streams').innerHTML = '';
}

request.addEventListener('load', () => {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText;
    const json = JSON.parse(response);
    domRender(json);
    removeBtn(json);
    wheel = true;
  }
});

function reset() {
  offset = 0;
  page = 1;
  removeDom();
}

document.querySelector('.wrapper').addEventListener('click', (e) => {
  if (e.target.classList[0] === 'btn') {
    offset = limit * page;
    page += 1;
    requestFn();
  } else if (e.target.classList[0] === 'game') {
    game = e.target.innerText;
    document.querySelector('.gameName').innerHTML = game;
    reset();
    requestFn();
  }
});

window.addEventListener('mousewheel', (e) => {
  if (e.deltaY === 125 && wheel) {
    window.addEventListener('scroll', () => {
      const { scrollTop } = document.documentElement;
      const { clientHeight } = document.documentElement;
      const { scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        offset = limit * page;
        page += 1;
        requestFn();
        wheel = false;
      }
    });
  }
});

requestFn();
