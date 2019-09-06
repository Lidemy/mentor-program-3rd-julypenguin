/* eslint-env jquery */
const url = 'http://localhost:5001/api';

async function getApi(qs) {
  const response = await fetch(`${url}/${qs}`);
  const jsonData = await response.json();
  return jsonData;
}

// 註冊
function registerbox() {
  const registerboxDiv = `
    <div class="register-wrapper">
      <h2 class="title">會員註冊</h2>
      <form class="userBox" action="api/register" method="post" accept-charset="utf-8">
        <label for="nickname-reg">暱稱：<input type="text" name="nickname" id="nickname-reg"></label>
        <label for="username-reg">帳號：<input type="text" name="username" id="username-reg" placeholder="請勿填真實帳號"></label>
        <label for="password-reg">密碼：<input type="password" name="password" id="password-reg" placeholder="請勿填真實密碼"></label>
        <input class="submit btn btn-primary submit-reg" type="submit" value="註冊">
        <div class="clearfix"></div>
      </form>
    </div>
  `;
  $('.registerbox').append(registerboxDiv);
}

// 登入
function loginbox() {
  const loginboxDiv = `
    <div class="login-wrapper">
      <h2 class="title">會員登入</h2>
      <form class="userBox" action="api/login" method="post" accept-charset="utf-8">
        <label for="username-login">帳號：<input type="text" name="username" id="username-login"></label>
        <label for="password-login">密碼：<input type="password" name="password" id="password-login"></label>
        <input class="submit btn btn-primary submit-login" type="submit" value="登入">
        <div class="clearfix"></div>
      </form>
    </div>
  `;
  $('.loginbox').append(loginboxDiv);
}

// navbar
async function navbar() {
  const userInfo = await getApi('checkuser');
  if (userInfo.length === 0) {
    registerbox();
    loginbox();
    const loginDiv = `
      <h4><a href='#' class='nav-link registerBtn'>加入會員</a></h4>
      <h4><a href='#' class='nav-link loginBtn'>登入</a></h4>
    `;
    $('.nav').append(loginDiv);
  }
  $('.nav').append(userInfo.map(user => `
    <h4><div class='user'>${user.nickname}</div></h4>
    <h4><a href='/' class='nav-link'>首頁</a></h4>
    ${/super_admin/.test(user.classification)
    ? "<h4><a href='authorization' class='nav-link'>權限管理</a></h4>" : ''}
    ${/admin/.test(user.classification)
    ? "<h4><a href='admin' class='nav-link'>後台管理</a></h4>" : ''}
    <h4><a href='api/logout' class='nav-link'>登出</a></h4>
  `));
}

// 主訊息輸入框
async function enterTextBox() {
  const userInfo = await getApi('checkuser');
  if (userInfo.length === 0) return;
  const enterTextBoxDiv = `
    <h2>歡迎留言</h2>
    <form class="enterTextBox" action="" method="post" accept-charset="utf-8">
      <textarea class="comment form-control" name="content" placeholder="想說些什麼嗎？"></textarea>
      <input class='submit btn btn-primary' type='submit' value='送出!' />
    </form>
    <div class="clearfix"></div>
  `;
  $('.enterMessage').append(enterTextBoxDiv);
}

// 子留言回覆輸入框
function innerTextBox(nicknames, layer, parentId) {
  return `
    <form class='inner-enterTextBox' action='' method='post' accept-charset='utf-8'>
      <textarea class='inner-comment form-control' name='content' data-layer='${layer}' data-id='${parentId}' placeholder='回應 ${nicknames}'></textarea>
      <input class='inner-submit btn btn-primary' type='submit' value='回覆留言' />
    </form>`;
}

// 更新留言輸入框
function updateTextBox(parentId, contents) {
  return `
  <form class='update-content' action='' method='post' accept-charset='utf-8'>
    <textarea class='update-content__textarea form-control' name='content' data-id='${parentId}' cols='91' rows='10'>${contents}</textarea>
    <div class='edit-box'>
      <input class='edit-btn ok btn btn-primary' type='submit' value='確認'>
      <span class='edit-btn cancel btn btn-success'>取消</span></a>
    </div>
  </form>
`;
}

// 子留言的一堆拼圖
function subContentStartHtml() {
  return `
      <section class='subContentBox'>
        <div class='next-arror'> >> </div>
        <div class='inner-info__wrapper'>
  `;
}

function subContentEndHtml() {
  return `
        </div>
      </section>
  `;
}

function checkOriginalStartHtml(parentUsername, contentUsername) {
  return (parentUsername === contentUsername) ? "<div class='inner-info original'>" : "<div class='inner-info'>";
}

function checkOriginalEndHtml() {
  return '</div>';
}

function nicknameHtml(nicknames) {
  return `<div class='col-sm-10 nameId'> ${nicknames} </div>`;
}

function editHtml(username, contentUsername, id, layer) {
  return (username === contentUsername || /admin/.test(document.location.href))
    ? `<i class='far fa-edit col-sm-1' data-id=${id} data-layer=${layer}></i>
       <i class='fas fa-times col-sm-1' data-id=${id} data-layer=${layer}></i>` : '';
}

function contentHtml(contents) {
  return `<div class='content col-sm-8'> ${contents}`;
}

function socialIconAndTimeHtml(username, id, count, createdAt) {
  return `
        <i class='far fa-thumbs-up ${username ? `thumbs-up-pointer' data-id=${id}` : '\''} ></i>
        <span class='thumbsup-number'> ${count} </span>
      </div>
    <div class='time col-md-3 col-sm-12'> ${createdAt} </div>
  `;
}

// 子留言拼裝
function subContentHtml(comment, originUser, username, layEnd) {
  let innerTextBoxDiv = '';
  let subContentDiv = '';
  if (comment.layer < layEnd && username) {
    innerTextBoxDiv = innerTextBox(comment.nickname, Number(comment.layer) + 1, comment.id);
    subContentDiv = innerTextBoxDiv;
  }

  for (let i = 1; i <= Object.keys(comment).length - 7; i += 1) {
    if (comment[`subContent${i}`]) {
      subContentDiv += `
        ${subContentStartHtml()}
        ${checkOriginalStartHtml(originUser, comment[`subContent${i}`].username)}
        ${nicknameHtml(comment[`subContent${i}`].nickname)}
        ${editHtml(username, comment[`subContent${i}`].username, comment[`subContent${i}`].id, comment[`subContent${i}`].layer)}
        ${contentHtml(comment[`subContent${i}`].content)}
        ${socialIconAndTimeHtml(username, comment[`subContent${i}`].id, comment[`subContent${i}`].thumbsUpCount, comment[`subContent${i}`].created_at)}
        ${checkOriginalEndHtml()}
      `;
      let subInnerContentDiv = '';
      if (subContentHtml(comment[`subContent${i}`]) !== undefined) {
        subInnerContentDiv = subContentHtml(comment[`subContent${i}`], originUser, username, layEnd);
      }

      subContentDiv += `
        ${subInnerContentDiv}
        ${subContentEndHtml()}
      `;
    }
  }
  return subContentDiv;
}

// 主留言拼裝
async function msgDomRender() {
  const comments = await getApi('');
  let userInfo = await getApi('checkuser');
  if (userInfo.length === 0) {
    userInfo = [{ username: false }];
  }
  const { username } = userInfo[0];

  $('.contentBox').empty();
  comments.forEach((comment) => {
    let subContentDiv = '';
    subContentDiv = subContentHtml(comment, comment.username, username, 5);

    const messageBox = `
            <section class='message-box'>
              ${nicknameHtml(comment.nickname)}
              ${editHtml(username, comment.username, comment.id, comment.layer)}
              ${contentHtml(comment.content)}
              ${socialIconAndTimeHtml(username, comment.id, comment.thumbsUpCount, comment.created_at)}
              ${subContentDiv}
            </section>
          `;
    $('.contentBox').append(messageBox);
  });
}

// authorization 的頁面
async function authorizationHtml() {
  const users = await getApi('users');
  $('.authorization-wrapper').empty();
  $('.authorization-wrapper').append(users.map(({
    username, nickname, content, classification,
  }) => {
    if (classification !== 'super_admin') {
      return `
        <section class='userinfo-box'>
          <div class='avatar-box'>
            <i class='fas fa-user-circle'></i>
          </div>
          <div class='user-box'>
            <div class='nickname-box'>暱稱：<div class='nickname'>${nickname}</div></div>
            <div class='username-box' data-username='${username}'> 帳號：<div class='username'>${username}</div></div>
            <div class='count-box'>留言數：<div class='count'>${content}</div></div>
            <form action='#' method='post'>
              <div class='authority__title' col-sm-3>權限：</div>
              <select class='authority-box form-control col-sm-5' name='authority'>
                <option value='normal' ${classification === 'normal' ? 'selected' : ''}>normal</option>
                <option value='admin' ${classification === 'admin' ? 'selected' : ''}>admin</option>
              </select>
              <input type='hidden' name='username' value='${username}'>
              <input class='auth-submit btn btn-primary col-sm-3' type='submit' value='確定'>
            </form>
          </div>
        </section>
      `;
    }
    return '';
  }));
}

async function setData(option, qs, id, data) {
  const response = await fetch(`${url}/${qs}/${id}`, {
    method: option,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json()).catch(err => console.log(err));
  msgDomRender();
  authorizationHtml();
  return response;
}

// 工具，用 id 去撈資料
function foundData(value, id) {
  for (let i = 1; i <= Object.keys(value).length - 7; i += 1) {
    if (Number(value.id) === id) {
      return value;
    }
    if (Number(value.id) !== id && value[`subContent${i}`]) {
      return foundData(value[`subContent${i}`], id);
    }
  }
  return false;
}

// 修改留言 所顯示的資訊
async function updateContentHtml(contentId, contentLayer) {
  let value = {};
  const comments = await getApi('');
  comments.forEach((comment) => {
    value = comment;
    if (contentLayer > 1) {
      value = foundData(comment, contentId);
    }
    if (Number(value.id) === contentId) {
      const messageBox = `
          <section class='message-box'>
            ${nicknameHtml(value.nickname)}
            ${updateTextBox(value.id, value.content)}
          </section>
        `;
      $('.updateContent').append(messageBox);
    }
  });
}

// 把沒有權限的人踢出去
async function notAdminLeave() {
  if (!/(authorization)|(admin)/.test(document.location.href)) return;
  const userInfo = await getApi('checkuser');
  if (userInfo.length !== 0) {
    const { classification } = userInfo[0];
    if (/(super_admin)/.test(classification)) return;
    if (/(admin)/.test(document.location.href) && /(admin)/.test(classification)) return;
  }
  window.location = 'http://localhost:5001';
}

// 註冊頁面滑進滑出
function slideRegisterHtml() {
  $('.loginbox').slideUp();
  $('.registerbox').slideToggle();
}

// 登入頁面滑進滑出
function slideLoginHtml() {
  $('.registerbox').slideUp();
  $('.loginbox').slideToggle();
}

// 刪除文章
function deleteComment() {
  $(this).parent('.message-box').hide(300);
  $(this).parents('.subContentBox').hide(300);
  const id = $(this).data('id');
  setData('DELETE', 'comments', id).then(({ success }) => {
    if (!success) {
      alert('刪除失敗');
    }
  });
}

// 呼叫編輯文章 HTML
function editCommentHtml() {
  const contentId = $(this).data('id');
  const contentLayer = $(this).data('layer');
  $('.updateContent').fadeIn();
  updateContentHtml(contentId, contentLayer);
  $('.header, .article').toggleClass('disable');
}

// 輸入主留言
function inputComment(e) {
  e.preventDefault();
  const addContentData = {
    content: `${$('.comment').val()}`,
    layer: 1,
    id: 0,
  };
  setData('POST', 'comments', '', addContentData);
  $('.comment').val('');
}

// 輸入子留言
function inputSubComment(e) {
  e.preventDefault();
  const addSubContentData = {
    content: `${$(this).parent().children('.inner-comment').val()}`,
    layer: `${$(this).parent().children('.inner-comment').data('layer')}`,
    id: `${$(this).parent().children('.inner-comment').data('id')}`,
  };
  setData('POST', 'comments', '', addSubContentData).then(res => console.log(res));
}

// 按讚
function inputThumbsUp() {
  const addThumbsUp = {
    id: `${$(this).data('id')}`,
  };
  setData('POST', 'thumbsup', '', addThumbsUp);
}

// 取消修改留言
function editCancel(e) {
  $('.updateContent').fadeOut();
  $(e.target).parents('.updateContent').empty();
  $('.header, .article').toggleClass('disable');
}

// 確認修改留言
function editOk(e) {
  e.preventDefault();
  const id = $('.update-content__textarea').data('id');
  const updateData = {
    content: `${$('.update-content__textarea').val()}`,
  };
  setData('PATCH', 'comments', id, updateData).then(({ success }) => alert(success ? '修改成功' : '修改失敗'));
  editCancel(e);
}

// 調整使用者權限
function editAuth(e) {
  if ($(e.target).hasClass('auth-submit')) {
    e.preventDefault();
    const authData = {
      username: `${$(e.target).parents('.user-box').children('.username-box').data('username')}`,
      authority: `${$(e.target).parent().children('.authority-box').find(':selected')
        .val()}`,
    };
    setData('PATCH', 'authorization', '', authData).then(success => alert(success ? '修改成功' : '修改失敗'));
  }
}


$(() => {
  navbar();
  enterTextBox();
  msgDomRender();
  notAdminLeave();
  authorizationHtml();

  // 監聽 navbar
  $('.nav').on('click', '.registerBtn', slideRegisterHtml); // 註冊頁
  $('.nav').on('click', '.loginBtn', slideLoginHtml); // 登入頁

  // 監聽主體
  $('.article').on('click', '.fa-times', deleteComment); // 刪除
  $('.article').on('click', '.fa-edit', editCommentHtml); // 編輯
  $('.article').on('click', '.submit', inputComment); // 輸入主留言
  $('.article').on('click', '.inner-submit', inputSubComment); // 輸入子留言
  $('.article').on('click', '.thumbs-up-pointer', inputThumbsUp); // 按讚

  // 監聽 更改留言頁面
  $('.updateContent').on('click', '.cancel', editCancel); // 取消修改留言
  $('.updateContent').on('click', '.ok', editOk); // 確認修改留言

  // 監聽 authorization
  $('.authorization-wrapper').on('click', '.auth-submit', editAuth); // 調整使用者權限
});
