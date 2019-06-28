/* eslint-env jquery */

function domRender(value) {
  const content = `      
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <div class="card-body">
          <p class="card-text">${value}</p>
          <a href="#" class="btn btn-primary done">完成</a>
          <a href="#" class="btn btn-danger delete">刪除</a>
        </div>
      </div>
    </div>
  `;
  $('.row').append(content);
}

$(() => {
  $('.btn-outline-secondary').on('click', (e) => {
    e.preventDefault();
    domRender($('.form-control').val());
    $('.form-control').val('');
  });

  $('.row').on('click', (e) => {
    if ($(e.target).hasClass('delete')) {
      $(e.target).parent().parent().parent()
        .remove();
    }
    if ($(e.target).hasClass('done')) {
      if ($(e.target).text() === '完成') {
        $(e.target).text('未完成');
      } else {
        $(e.target).text('完成');
      }
      $(e.target).parent().parent().toggleClass('done-bgc');
    }
  });
});
