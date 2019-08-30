import {UPDATE_SERVICES_TYPE} from '../actions/servicesActions';

const initialState = {
    servicesType: null,
    content: null
};

const reducerServices = (state = initialState, action) => {

    switch(action.type){
        case UPDATE_SERVICES_TYPE: return {
            ...state,
            servicesType: action.update.servicesType,
            content: action.update.content,
        }
        default: return state;
    }
};

export {reducerServices};