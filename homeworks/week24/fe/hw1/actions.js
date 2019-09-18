import EasyActions from 'redux-easy-actions';

const { Actions, Constants } = EasyActions({
  GET_POST_LIST(type, payload) {
    return { type, payload };
  },

  GET_POST_LIST_RESULT(type, error, list) {
    return { type, error, list };
  },

  GET_POST(type, id) {
    return { type, id };
  },

  GET_POST_RESULT(type, error, item) {
    return { type, error, item };
  },

  CREATE_POST(type, payload) {
    return { type, payload };
  },

  CREATE_POST_RESULT(type, error) {
    return { type, error };
  },

  CLEAR_CREATE_ERR(type) {
    return { type };
  },


  DELETE_POST(type, id) {
    return { type, id };
  },

  DELETE_POST_RESULT(type, error) {
    return { type, error };
  },

  CLEAR_DELETE_ERROR(type) {
    return { type };
  },

  UPDATE_POST(type, id, payload) {
    return { type, id, payload };
  },

  UPDATE_POST_RESULT(type, error) {
    return { type, error };
  },

});

export { Actions, Constants as ActionTypes };
