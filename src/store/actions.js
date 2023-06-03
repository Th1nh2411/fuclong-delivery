import {
    SET_DETAIL_ADDRESS,
    SET_DETAIL_ITEM,
    SET_DISTANCE,
    SET_ID_SHOP,
    SET_SHOW_LOGIN,
    SET_TOAST,
} from './constraints';
export const setIdShop = (payload) => ({ type: SET_ID_SHOP, payload });
export const setShowLogin = (payload) => ({ type: SET_SHOW_LOGIN, payload });
export const setDetailItem = (payload) => ({ type: SET_DETAIL_ITEM, payload });
export const setDetailAddress = (payload) => ({ type: SET_DETAIL_ADDRESS, payload });
export const setToast = (payload) => ({ type: SET_TOAST, payload });
export const setDistance = (payload) => ({ type: SET_DISTANCE, payload });
