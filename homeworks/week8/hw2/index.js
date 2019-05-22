const contentRequest = new XMLHttpRequest();
const pageRequest = new XMLHttpRequest();
const article = document.querySelector('.article');
const comment = document.querySelector('.comment');
const url = 'https://lidemy-book-store.herokuapp.com/posts';
let pageIndex = 1;
let pageTotal = 1;
let point = 0;
const limit = 20;

function getRequest(req, toUrl) {
  req.open('GET', toUrl);
  req.send();
}

function msgDomRender(data) {
  data.forEach((value) => {
    const section = document.createElement('section');
    section.classList.add('messageBoardBox');
    section.innerHTML = `
    <div class="nameId">#${value.id}</div>
    <div class="content">
      ${value.content}
    </div>
    <div class="socialSignBox">
      <a><i class="far fa-heart"></i></a>
      <a><i class="far fa-thumbs-up"></i></a>
    </div>
    `;
    article.appendChild(section);
  });
}

function removeDom() {
  const messageBoardBox = document.querySelectorAll('.messageBoardBox');
  messageBoardBox.forEach(() => {
    article.removeChild(document.querySelectorAll('.messageBoardBox')[0]);
  });
}

function pageDomRander(idx) {
  const pageView = document.querySelectorAll('.pageNum');
  pageView[idx].classList.add('clearView');
}

function pageColorDom() {
  const pageView = document.querySelectorAll('.pageNum');
  pageView.forEach((value, index) => {
    if (pageView[index].classList.contains('current')) {
      pageView[index].classList.remove('current');
    }
  });
  pageView[pageIndex - 1].classList.add('current');
}

function changePage() {
  removeDom();
  getRequest(contentRequest, `${url}?_page=${pageIndex}&_limit=${limit}&_sort=id&_order=desc`);
  pageColorDom();
}

contentRequest.addEventListener('load', () => {
  if (contentRequest.status >= 200 && contentRequest.status < 400) {
    const response = contentRequest.responseText;
    const json = JSON.parse(response);
    msgDomRender(json);
  } else {
    alert('連線不正確，請重新整理');
  }
});

pageRequest.addEventListener('load', () => {
  if (pageRequest.status >= 200 && pageRequest.status < 400) {
    const pageResponse = pageRequest.responseText;
    const pageJson = JSON.parse(pageResponse);
    pageTotal = Math.ceil(pageJson.length / limit);
    if (pageTotal >= 7) {
      pageTotal = 6;
    }
    for (let i = 0; i < pageTotal; i += 1) {
      pageDomRander(i);
    }
  }
});

document.querySelector('.article').addEventListener('click', (e) => {
  switch (e.target.classList[0]) {
    case 'pageNum':
      pageIndex = Number(e.target.id);
      changePage();
      break;
    case 'next_page':
      if (pageIndex < pageTotal) {
        pageIndex += 1;
        changePage();
      }
      break;
    case 'pre_page':
      if (pageIndex >= 2) {
        pageIndex -= 1;
        changePage();
      }
      break;
    case 'far':
      point = Number(e.target.innerText) + 1;
      e.target.innerText = point;
      break;
    case 'submit':
      contentRequest.open('POST', url, true);
      contentRequest.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded',
      );
      contentRequest.send(`id&content=${comment.value}`);
      break;
    default:
  }
});

getRequest(contentRequest, `${url}?_limit=${limit}&_sort=id&_order=desc`);
getRequest(pageRequest, `${url}?_sort=id&_order=desc`);
