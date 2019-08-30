const UPDATE_SERVICES_TYPE = 'UPDATE_SERVICES_TYPE';


const updateServicesType = (state) => {
    return {
        type: UPDATE_SERVICES_TYPE,
        update: {...state}
    }
};

export {
    updateServicesType, UPDATE_SERVICES_TYPE
};