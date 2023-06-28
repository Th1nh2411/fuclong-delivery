import * as httpRequest from '../utils/httpRequest';

export const login = async (phone, password, token) => {
    const config = {
        headers: { access_token: token },
    };
    const body = {
        phone,
        password,
    };
    try {
        const res = await httpRequest.post('account/login', body);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const register = async (phone, password, name, token) => {
    const config = {
        headers: { access_token: token },
    };
    const body = {
        phone,
        password,
        name,
    };
    try {
        const res = await httpRequest.post('account/create', body);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
