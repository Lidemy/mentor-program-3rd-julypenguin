import { combineReducers } from 'redux';
import { postReducer as post } from './post';

const reducer = combineReducers({
  post,
});

export default reducer;
