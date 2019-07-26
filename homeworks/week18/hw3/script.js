/* eslint-env jquery */

let list = [];

function render() {
  $('.row').empty();
  $('.row').append(list.map(({ id, content, isDone }) => `      
    <div class="col-12 margin">
      <div class="card ${isDone ? 'done-bgc' : ''}">
        <div class="card-body")>
          <span class="text-wrapper">
            <span class="card-text " data-id=${id}>${content}</span>
            <span class="badge ${isDone ? 'badge-success' : 'badge-warning'}">${isDone ? '完成' : '未完成'}</span>
          </span>
          <a href="#" class="btn btn-danger delete")>刪除</a>
        </div>
      </div>
    </div>
  `));
}

function addTodo(content) {
  list = [...list, { id: Date.now(), content, isDone: false }];
  $('.form-control').val('');
  render();
}

function removeTodo(id) {
  list = list.filter(item => item.id !== id);
  render();
}

function checkDone(id) {
  list.forEach((item, idx) => {
    if (id === item.id) {
      list[idx].isDone = !item.isDone;
    }
  });
  render();
}

$(() => {
  $('.btn-outline-secondary').on('click', (e) => {
    e.preventDefault();
    const reg = /([\S])/;
    if (!reg.test($('.form-control').val())) return;
    addTodo($('.form-control').val());
  });

  $('.row').on('click', '.delete', (e) => {
    removeTodo($(e.target).parent().find('.card-text').data('id'));
  });

  $('.row').on('click', '.card', (e) => {
    checkDone($(e.target).parent().find('.card-text').data('id'));
  });
});
