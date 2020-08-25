const SET_DRIVER_DATA = 'SET-DRIVER-DATA';

let initialState = {
    driver_name: null,
    driver_phone_1: null,
    driver_phone_2: null,
    driver_email: null
};

const driverDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRIVER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
};

export const setDriverData = (data) => ({type: SET_DRIVER_DATA, data});

export default driverDataReducer;