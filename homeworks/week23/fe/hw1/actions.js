import { TO_ACTIVE_NAV } from './actionTypes.js';

export const toActiveNav = nav => ({
  type: TO_ACTIVE_NAV,
  value: nav,
});
