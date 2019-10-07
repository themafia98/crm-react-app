const UPDATE_SERVICES_TYPE = 'UPDATE_SERVICES_TYPE';
const LOAD_PRICE_CARDS = 'LOAD_PRICE_CARDS';
const ERROR_LOAD = 'ERROR_LOAD';


const updateServicesType = (state) => {
    return {
        type: UPDATE_SERVICES_TYPE,
        update: {...state}
    }
};

const loadPriceCards = (state) => {
    return {
        type: LOAD_PRICE_CARDS,
        payload: {...state}
    }
}

const errorSetter = (state) => {
    return {
        type: ERROR_LOAD,
        error: state /** @param string */
    }
}

export {
    updateServicesType, UPDATE_SERVICES_TYPE,
    loadPriceCards, LOAD_PRICE_CARDS,
    errorSetter, ERROR_LOAD
};