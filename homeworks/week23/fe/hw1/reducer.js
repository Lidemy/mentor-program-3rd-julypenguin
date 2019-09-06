import { TO_ACTIVE_NAV } from './actionTypes';

const state = {
  nav: '',
};

function reducer(globalState = state, action) {
  switch (action.type) {
    case TO_ACTIVE_NAV:
      return {
        ...globalState,
        nav: action.value,
      };
    default:
      return globalState;
  }
}

export default reducer;

