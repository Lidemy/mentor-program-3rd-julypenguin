import { ActionTypes } from '../actions';

const defaultState = {
  postList: [],
  post: {},
  isLoadingGetPostList: false,
  isLoadingGetPost: false,
  isLoadingCreatePost: false,
  isLoadingDeletePost: false,
  isLoadingUpdatePost: false,
  getPostListError: null,
  getPostError: null,
  updatePostError: null,
  createPostError: null,
  deletePostError: null,
  isRequestAgain: false,
  linkTo: false,
};

function postReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_POST_LIST:
      return {
        ...state,
        isLoadingGetPostList: true,
        getPostListError: null,
      };

    case ActionTypes.GET_POST_LIST_RESULT:
      return {
        ...state,
        isLoadingGetPostList: false,
        getPostListError: action.error,
        postList: action.list ? action.list : [],
      };

    case ActionTypes.GET_POST:
      return {
        ...state,
        isLoadingGetPost: true,
        getPostError: null,
      };

    case ActionTypes.GET_POST_RESULT:
      return {
        ...state,
        isLoadingGetPost: false,
        getPostError: action.error,
        post: action.item ? action.item : {},
      };

    case ActionTypes.CREATE_POST:
      return {
        ...state,
        isLoadingCreatePost: true,
        createPostError: null,
      };

    case ActionTypes.CREATE_POST_RESULT:
      return {
        ...state,
        isLoadingCreatePost: false,
        createPostError: action.error,
        linkTo: !action.error,
      };

    case ActionTypes.CLEAR_CREATE_ERR:
      return {
        ...state,
        createPostError: null,
        linkTo: false,
      };

    case ActionTypes.DELETE_POST:
      return {
        ...state,
        isLoadingDeletePost: true,
      };

    case ActionTypes.DELETE_POST_RESULT:
      return {
        ...state,
        isLoadingDeletePost: false,
        deletePostError: action.error,
        isRequestAgain: !state.isRequestAgain,
        linkTo: !action.error,
      };

    case ActionTypes.CLEAR_DELETE_ERROR:
      return {
        ...state,
        deletePostError: null,
        linkTo: false,
      };

    case ActionTypes.UPDATE_POST:
      return {
        ...state,
        isLoadingUpdatePost: true,
        updatePostError: null,
      };

    case ActionTypes.UPDATE_POST_RESULT:
      return {
        ...state,
        isLoadingUpdatePost: false,
        updatePostError: action.error,
        isRequestAgain: !state.isRequestAgain,
      };

    default:
      return state;
  }
}

export { postReducer, defaultState };
