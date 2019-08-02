/* eslint-env jquery */

const url = 'http://julypenguin.tw/week19/api.php';
let list = [];
let checkEdit = false;

async function getTodo() {
  const response = await fetch(url);
  const todos = await response.json();
  list = [];
  todos.forEach(({
    id, content, state, createTime,
  }) => {
    list = [{
      id, content, state, createTime, edit: false,
    }, ...list];
  });
}

async function render() {
  if (!checkEdit) {
    await getTodo();
  }

  $('.row').empty();
  $('.row').append(list.map(({
    id, content, state, createTime, edit,
  }) => `
    <div class="col-12 margin cards">
      <div class="card ${state === '1' ? 'done-bgc' : ''}">
        <div class="card-body")>
          <span class="text-wrapper">
            <span class="card-text" data-id=${id}>
              <input type="checkbox" class="done" ${state === '1' ? 'checked' : ''} ${checkEdit ? 'disabled' : ''}>
              ${edit ? `<input class="edit-input" value="${content}"></input>` : content}
            </span>
            <span class="badge ${state === '1' ? 'badge-success' : 'badge-warning'}">${state === '1' ? '完成' : '未完成'}</span>
            <div class="time">${createTime}</div>
          </span>
          <span>
            <a href="#" class="btn btn-primary edit")>${edit ? '取消' : '編輯'}</a>
            <a href="#" class="btn btn-danger delete")>刪除</a>
          </span>
        </div>
      </div>
    </div>
  `));
}

async function isFetch(option, id, data) {
  await fetch(`http://julypenguin.tw/week19/api.php/${id}`, {
    method: option,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  }).catch(err => console.log(err));
}

async function addTodo(content) {
  if (checkEdit) return;
  const data = {
    content,
  };
  await isFetch('POST', '', data);
  $('.form-control').val('');
  render();
}

async function removeTodo(id) {
  if (checkEdit) return;
  await isFetch('DELETE', id);
  render();
}

async function checkDone(id) {
  let data = {};
  list.forEach((item) => {
    if (id === Number(item.id)) {
      data = { state: -item.state };
    }
  });
  await isFetch('PATCH', id, data);
  render();
}

function cancel(idx) {
  list[idx].edit = list[idx].edit;
  checkEdit = !checkEdit;
  $('.row').off('keydown', '.edit-input');
  $(window).off('keydown');
  render();
}

function editTodo(id) {
  let data = {};
  let index = 0;
  list.forEach((item, idx) => {
    if (id === Number(item.id)) {
      list[idx].edit = !item.edit;
      index = idx;
    } else {
      list[idx].edit = false;
    }
  });
  checkEdit = !checkEdit;
  render();

  $('.row').on('keydown', '.edit-input', async (e) => {
    if (e.key === 'Enter') {
      data = {
        content: $('.edit-input').val(),
      };
      await isFetch('PATCH', id, data);
      cancel(index);
    }
  });

  $(window).on('keydown', (e) => {
    if (e.key === 'Escape') {
      cancel(index);
    }
  });

  if (!checkEdit) {
    $('.row').off('keydown', '.edit-input');
    $(window).off('keydown');
  }
}

$(() => {
  render();

  $('.btn-outline-secondary').on('click', (e) => {
    e.preventDefault();
    const reg = /([\S])/;
    if (!reg.test($('.form-control').val())) return;
    addTodo($('.form-control').val());
  });

  $('.row').on('click', '.delete', (e) => {
    e.preventDefault();
    removeTodo($(e.target).parents('.card-body').find('.card-text').data('id'));
  });

  $('.row').on('click', '.done', (e) => {
    checkDone($(e.target).parent('.card-text').data('id'));
  });

  $('.row').on('click', '.edit', (e) => {
    e.preventDefault();
    editTodo($(e.target).parents('.card-body').find('.card-text').data('id'));
  });
});
