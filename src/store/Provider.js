import { useReducer } from 'react';
import UserContext from './Context';
import reducer from './reducer';

function Provider({ children }) {
    const initState = {
        idShop: 2,
        distance: 0,
        showLogin: false,
        detailItem: { show: false, data: {}, editing: false },
        toast: { show: false, content: '', title: '' },
    };
    const [state, dispatch] = useReducer(reducer, initState);
    return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}

export default Provider;
