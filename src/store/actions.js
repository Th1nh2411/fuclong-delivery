import { SET_DETAIL_ITEM, SET_ID_SHOP, SET_SHOW_LOGIN } from './constraints';
export const setIdShop = (payload) => ({ type: SET_ID_SHOP, payload });
export const setShowLogin = (payload) => ({ type: SET_SHOW_LOGIN, payload });
export const setDetailItem = (payload) => ({ type: SET_DETAIL_ITEM, payload });
