import * as httpRequest from '../utils/httpRequest';

export const getListShop = async (latitude = 10.848046, longitude = 106.785888) => {
    const config = {
        params: {
            latitude,
            longitude,
        },
    };
    try {
        const res = await httpRequest.get('user/getListShop', config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
