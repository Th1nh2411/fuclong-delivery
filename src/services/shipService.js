import * as httpRequest from '../utils/httpRequest';

export const getShippingFee = async (distance, idShipping_company = 1) => {
    const config = {
        params: {
            distance,
            idShipping_company,
        },
    };

    try {
        const res = await httpRequest.get(`order/getShipFee`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
