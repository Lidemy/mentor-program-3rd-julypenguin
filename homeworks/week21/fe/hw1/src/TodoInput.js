import React from 'react';

const TodoInput = (props) => {
  const { text, onChangeText, handleSubmit } = props;
  return (
    <div>
      <form className="input-group mb-3" onSubmit={handleSubmit}>
        <input type="text" className="form-control" placeholder="請輸入文字" value={text} onChange={onChangeText} />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">送出！</button>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
