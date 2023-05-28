import { SET_ID_SHOP } from './constraints';

function reducer(state, action) {
    switch (action.type) {
        case SET_ID_SHOP:
            return { ...state, idShop: action.payload };
        default:
            return state;
    }
}
export default reducer;
