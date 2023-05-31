import { SET_DETAIL_ITEM, SET_ID_SHOP, SET_SHOW_LOGIN } from './constraints';

function reducer(state, action) {
    switch (action.type) {
        case SET_ID_SHOP:
            return { ...state, idShop: action.payload };
        case SET_SHOW_LOGIN:
            return { ...state, showLogin: action.payload };
        case SET_DETAIL_ITEM:
            return { ...state, detailItem: action.payload };
        default:
            return state;
    }
}
export default reducer;
