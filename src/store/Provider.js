import { useEffect, useReducer } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import LocalStorageManager from '../utils/LocalStorageManager';
import * as invoiceService from '../services/invoiceService';

function Provider({ children }) {
    const localStorageManager = LocalStorageManager.getInstance();
    const getCurrentInvoice = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.getCurrentInvoice(token);
            if (results) {
                dispatch(actions.setCurrentInvoice(results));
            }
        }
    };
    const initState = {
        idShop: 2,
        userInfo: null,
        distance: 0,
        showLogin: false,
        detailItem: { show: false, data: null, editing: false },
        detailAddress: { show: false, address: '' },
        cartData: null,
        currentInvoice: null,
        toast: { show: false, content: '', title: '' },
        getCurrentInvoice,
    };
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        getCurrentInvoice();
    }, []);
    console.log(state.currentInvoice);
    return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}

export default Provider;
