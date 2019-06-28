/* eslint-env jquery */
let pageIndex = 1;
let pages = 1;

function getApi(qs) {
  return fetch(`api.php?${qs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .catch(err => console.log('錯誤', err));
}

// 註冊
function registerbox() {
  const registerboxDiv = `
    <div class="register-wrapper">
      <h2 class="title">會員註冊</h2>
      <form class="userBox" action="handle_register.php" method="post">
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
      <form class="userBox" action="handle_login.php" method="post">
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
function navbar() {
  let loginDiv = '';
  getApi('checkUser')
    .then((response) => {
      if (response) {
        if (document.location.href !== 'http://mentor-program.co/group3/julypenguin/week13/authorization.php' && response.superAdmin) {
          loginDiv += "<h4><a href='authorization.php' class='nav-link'>權限管理</a></h4>";
        }
        if (document.location.href !== 'http://mentor-program.co/group3/julypenguin/week13/admin.php' && response.admin) {
          loginDiv += "<h4><a href='admin.php' class='nav-link'>後台管理</a></h4>";
        }
        if (document.location.href !== 'http://mentor-program.co/group3/julypenguin/week13/index.php') {
          loginDiv += "<h4><a href='index.php' class='nav-link'>回到首頁</a></h4>";
        }
        loginDiv += `
          <h4><div class='user'>${response.nickname}</div></h4>
          <h4><a href='handle_logout.php' class='nav-link'>登出</a></h4>
        `;
      } else {
        loginDiv = `
        <h4><a href='#' class='nav-link registerBtn'>加入會員</a></h4>
        <h4><a href='#' class='nav-link loginBtn'>登入</a></h4>
        `;
        registerbox();
        loginbox();
      }
      $('.nav').append(loginDiv);
    })
    .catch(err => console.log('錯誤', err));
}

// 主訊息輸入框
function enterTextBox(userInfo) {
  if (userInfo !== 'noUsername') {
    const enterTextBoxDiv = `
      <h2>歡迎留言</h2>
      <form class="enterTextBox" action="" method="post">
        <textarea class="comment form-control" name="content" placeholder="想說些什麼嗎？"></textarea>
        <input class='submit btn btn-primary' type='submit' value='送出!' />
      </form>
      <div class="clearfix"></div>
    `;
    $('.enterMessage').append(enterTextBoxDiv);
  }
}

// 子留言回覆輸入框
function innerTextBox(nicknames, layer, parentId) {
  return document.cookie ? `
    <form class='inner-enterTextBox' action='' method='post'>
      <textarea class='inner-comment form-control' name='content' data-layer='${layer}' data-id='${parentId}' placeholder='回應 ${nicknames}'></textarea>
      <input class='inner-submit btn btn-primary' type='submit' value='回覆留言' />
    </form>` : '';
}

// 更新留言輸入框
function updateTextBox(parentId, contents) {
  return `
  <form class='update-content' action='' method='post'>
    <textarea class='update-content__textarea form-control' name='content' data-id='${parentId}' cols='91' rows='10'>${contents}</textarea>
    <div class='edit-box'>
      <input class='edit-btn ok btn btn-primary' type='submit' value='確認'>
      <span class='edit-btn cancel btn btn-success'>取消</span></a>
    </div>
  </form>
`;
}

// 子留言的一堆拼圖
function subContentStart() {
  return `
      <section class='subContentBox'>
        <div class='next-arror'> >> </div>
        <div class='inner-info__wrapper'>
  `;
}

function subContentEnd() {
  return `
        </div>
      </section>
  `;
}

function checkOriginalStart(parentUsername, contentUsername) {
  return (parentUsername === contentUsername) ? "<div class='inner-info original'>" : "<div class='inner-info'>";
}

function checkOriginalEnd() {
  return '</div>';
}

function nickname(nicknames) {
  return `<div class='col-sm-10 nameId'> ${nicknames} </div>`;
}
function edit(username, contentUsername, id, layer) {
  return (username === contentUsername || document.location.href === 'http://mentor-program.co/group3/julypenguin/week13/admin.php')
    ? `<i class='far fa-edit col-sm-1' data-id=${id} data-layer=${layer}></i>
     <i class='fas fa-times col-sm-1' data-id=${id} data-layer=${layer}></i>` : '';
}

function content(contents) {
  return `<div class='content col-sm-8'> ${contents}`;
}

function socialIconAndTime(id, count, createdAt) {
  let thumbsUp = '';
  if (document.cookie) {
    thumbsUp += `<i class='far fa-thumbs-up thumbs-up-pointer' data-id='${id}'></i>`;
  } else {
    thumbsUp += "<i class='far fa-thumbs-up'></i>";
  }
  thumbsUp += `
                 <span class='thumbsup-number'> ${count} </span>
               </div>
             <div class='time col-md-3 col-sm-12'> ${createdAt} </div>
  `;
  return thumbsUp;
}

// 子留言拼裝
function subContent(value, originUser, userInfo, layEnd) {
  let innerTextBoxDiv = '';
  let subContentDiv = '';
  if (value.layer < layEnd && userInfo !== 'noUsername') {
    innerTextBoxDiv = innerTextBox(value.nickname, Number(value.layer) + 1, value.id);
    subContentDiv = innerTextBoxDiv;
  }

  for (let i = 1; i <= Object.keys(value).length - 7; i += 1) {
    if (value[`subContent${i}`]) {
      subContentDiv += `
        ${subContentStart()}
        ${checkOriginalStart(originUser, value[`subContent${i}`].username)}
        ${nickname(value[`subContent${i}`].nickname)}
        ${edit(userInfo, value[`subContent${i}`].username, value[`subContent${i}`].id, value[`subContent${i}`].layer)}
        ${content(value[`subContent${i}`].content)}
        ${socialIconAndTime(value[`subContent${i}`].id, value[`subContent${i}`].thumbsUpCount, value[`subContent${i}`].created_at)}
        ${checkOriginalEnd()}
      `;
      let subInnerContentDiv = '';
      if (subContent(value[`subContent${i}`]) !== undefined) {
        subInnerContentDiv = subContent(value[`subContent${i}`], originUser, userInfo, layEnd);
      }

      subContentDiv += `
        ${subInnerContentDiv}
        ${subContentEnd()}
      `;
    }
  }
  return subContentDiv;
}

// 主留言拼裝
function msgDomRender(userInfo) {
  getApi(`page=${pageIndex}`)
    .then((response) => {
      $('.message-box').addClass('isDeleted');
      response.forEach((value) => {
        let subContentDiv = '';
        subContentDiv = subContent(value, value.username, userInfo, 5);
        const messageBox = `
            <section class='message-box'>
              ${nickname(value.nickname)}
              ${edit(userInfo, value.username, value.id, value.layer)}
              ${content(value.content)}
              ${socialIconAndTime(value.id, value.thumbsUpCount, value.created_at)}
              ${subContentDiv}
            </section>
          `;
        $('.contentBox').append(messageBox);
      });
      $('.isDeleted').remove();
    })
    .catch(err => console.log('錯誤', err));
}

// 登入時 留言 才會顯示編輯、刪除按鈕
function checkUserMsgDomRender() {
  getApi('checkUser')
    .then((resUserInfo) => {
      enterTextBox(resUserInfo.username);
      msgDomRender(resUserInfo.username);
    })
    .catch((err) => {
      enterTextBox('noUsername');
      msgDomRender('noUsername');
      console.log('錯誤', err);
    });
}

// 工具，拿來 post 用
function postData(url, data) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.text()).then((jsonData) => {
    console.log(jsonData);
    checkUserMsgDomRender();
  }).catch(err => console.log('錯誤', err));
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
function updateContent(contentId, contentLayer) {
  let value = {};
  getApi('')
    .then((response) => {
      response.forEach((element) => {
        value = element;
        if (contentLayer > 1) {
          value = foundData(element, contentId);
        }
        if (Number(value.id) === contentId) {
          const messageBox = `
              <section class='message-box'>
                ${nickname(value.nickname)}
                ${updateTextBox(value.id, value.content)}
              </section>
            `;
          $('.updateContent').append(messageBox);
        }
      });
    });
}

// 頁數在頭或尾時顯示 不可上一頁或下一頁
function pageNoAllow() {
  if (pageIndex < 2) {
    $('.pre-page').toggleClass('no-allow');
  }
  if (pageIndex >= pages) {
    $('.next-page').toggleClass('no-allow');
  }
}

// 顯示 page 頁籤
function pageRender() {
  const prePage = `
    <div class='pageNum pre-page'> < </div>
    <div class='etc'>...</div>`;
  const nextPage = `
    <div class='etc'>...</div>
    <div class='pageNum next-page'> > </div>
  `;
  let page = '';
  getApi('limit=100')
    .then((response) => {
      const limit = 20;
      const dataNum = response.length;
      pages = Math.ceil(dataNum / limit);
      for (let i = 1; i <= pages; i += 1) {
        if (i === pageIndex) {
          page += `<div class='pageNum page current'>${i}</div>`;
        } else {
          page += `<div class='pageNum page'>${i}</div>`;
        }
      }
      $('.pageNum, .etc').remove();
      $('.pageBox').append(prePage + page + nextPage);
      pageNoAllow();
      checkUserMsgDomRender();
    });
}

// superAdmin.php 的頁面
function authorizationCard() {
  getApi('userInfo')
    .then((resUserInfo) => {
      resUserInfo.forEach((value) => {
        let userInfoDiv = '';
        if (value.classification !== 'super_admin') {
          userInfoDiv = `
                  <section class='userinfo-box'>
                    <div class='avatar-box'>
                      <i class='fas fa-user-circle'></i>
                    </div>
                    <div class='user-box'>
                      <div class='nickname-box'>暱稱：<div class='nickname'>${value.nickname}</div></div>
                      <div class='username-box' data-username='${value.username}'> 帳號：<div class='username'>${value.username}</div></div>
                      <div class='count-box'>留言數：<div class='count'>${value.content}</div></div>
                      <form action='handle_authorization.php' method='post'>
                        <div class='authority__title' col-sm-3>權限：</div>
                        <select class='authority-box form-control col-sm-5' name='authority'>
          `;
        }
        if (value.classification === 'normal') {
          userInfoDiv += `<option value='normal' selected>normal</option>
                          <option value='admin'>admin</option>`;
        } else {
          userInfoDiv += `<option value='normal'>normal</option>
                          <option value='admin' selected>admin</option>`;
        }
        userInfoDiv += `
                        </select>
                        <input type='hidden' name='username' value='${value.username}'> 
                        <input class='auth-submit btn btn-primary col-sm-3' type='submit' value='確定'>
                      </form>
                    </div>
                  </section>
        `;
        $('.authorization-wrapper').append(userInfoDiv);
      });
    })
    .catch(err => console.log('錯誤', err));
}

// 把沒有權限的人踢出去
function notAdminLeave() {
  if (document.location.href === 'http://mentor-program.co/group3/julypenguin/week13/authorization.php') {
    getApi('checkUser')
      .then((resUserInfo) => {
        if (!resUserInfo.superAdmin) {
          window.location = 'http://mentor-program.co/group3/julypenguin/week13/index.php';
        }
      });
  }

  if (document.location.href === 'http://mentor-program.co/group3/julypenguin/week13/admin.php') {
    getApi('checkUser')
      .then((resUserInfo) => {
        if (!resUserInfo.admin) {
          window.location = 'http://mentor-program.co/group3/julypenguin/week13/index.php';
        }
      });
  }
}

$(() => {
  navbar();
  pageRender('');
  notAdminLeave();
  authorizationCard();

  // 監聽 navbar
  $('.nav').on('click', (e) => {
    if ($(e.target).hasClass('registerBtn')) {
      $('.loginbox').slideUp();
      $('.registerbox').slideToggle();
    }

    if ($(e.target).hasClass('loginBtn')) {
      $('.registerbox').slideUp();
      $('.loginbox').slideToggle();
    }
  });

  // 監聽主體
  $('.article').on('click', (e) => {
    if ($(e.target).hasClass('fa-times')) {
      $(e.target).parent('.message-box').hide(300);
      $(e.target).parents('.subContentBox').hide(300);
      const deleteData = {
        id: `${$(e.target).data('id')}`,
      };
      postData('handle_delete.php', deleteData);
    }

    if ($(e.target).hasClass('fa-edit')) {
      const contentId = $(e.target).data('id');
      const contentLayer = $(e.target).data('layer');
      $('.updateContent').fadeIn();
      updateContent(contentId, contentLayer);
      $('.header, .article').toggleClass('disable');
    }

    if ($(e.target).hasClass('page')) {
      pageIndex = Number($(e.target).text());
      pageRender(`api.php?page=${pageIndex}`);
    }

    if ($(e.target).hasClass('pre-page')) {
      if (pageIndex > 1) {
        pageIndex -= 1;
        pageRender(`api.php?page=${pageIndex}`);
      }
    }

    if ($(e.target).hasClass('next-page')) {
      if (pageIndex < pages) {
        pageIndex += 1;
        pageRender(`api.php?page=${pageIndex}`);
      }
    }

    if ($(e.target).hasClass('submit')) {
      e.preventDefault();
      const addContentData = {
        content: `${$('.comment').val()}`,
        layer: 1,
        id: 0,
      };
      postData('handle_add_comment.php', addContentData);
      $('.comment').val('');
    }

    if ($(e.target).hasClass('inner-submit')) {
      e.preventDefault();
      const addSubContentData = {
        content: `${$(e.target).parent().children('.inner-comment').val()}`,
        layer: `${$(e.target).parent().children('.inner-comment').data('layer')}`,
        id: `${$(e.target).parent().children('.inner-comment').data('id')}`,
      };
      postData('handle_add_comment.php', addSubContentData);
    }

    if ($(e.target).hasClass('thumbs-up-pointer')) {
      const addThumpUp = {
        id: `${$(e.target).data('id')}`,
      };
      postData('handle_thumbsup.php', addThumpUp);
    }
  });

  // 監聽 更改留言頁面
  $('.updateContent').on('click', (e) => {
    if ($(e.target).hasClass('cancel')) {
      $('.updateContent').fadeOut();
      $(e.target).parents('.message-box')
        .remove();
      $('.header, .article').toggleClass('disable');
    }

    if ($(e.target).hasClass('ok')) {
      e.preventDefault();
      const updateData = {
        content: `${$('.update-content__textarea').val()}`,
        id: `${$('.update-content__textarea').data('id')}`,
      };
      postData('handle_update.php', updateData);
      $('.updateContent').fadeOut();
      $(e.target).parents('.message-box')
        .remove();
      $('.header, .article').toggleClass('disable');
    }
  });

  // 監聽 authorization.php
  $('.authorization-wrapper').on('click', (e) => {
    if ($(e.target).hasClass('auth-submit')) {
      e.preventDefault();
      const authData = {
        username: `${$(e.target).parents('.user-box').children('.username-box').data('username')}`,
        authority: `${$(e.target).parent().children('.authority-box').find(':selected')
          .val()}`,
      };
      postData('handle_authorization.php', authData);
      authorizationCard();
      alert('修改成功');
    }
  });
});
