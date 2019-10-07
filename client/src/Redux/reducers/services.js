import {UPDATE_SERVICES_TYPE, LOAD_PRICE_CARDS, ERROR_LOAD} from '../actions/servicesActions';

const initialState = {
    servicesType: null,
    content: null,
    error: null,
    cards: {
        type: '',
        storeCards: [],
    }
};

const reducerServices = (state = initialState, action) => {

    switch(action.type){
        case UPDATE_SERVICES_TYPE: return {
            ...state,
            error: null,
            servicesType: action.update.servicesType,
            content: [...action.update.content],
        }
        case LOAD_PRICE_CARDS: return {
            ...state,
            cards: {
                ...state.cards,
                error: null,
                type: action.payload.type,
                storeCards: [...action.payload.cards]
            }
        }
        case ERROR_LOAD: return ({
            ...state,
            error: action['error']
        });

        default: return state;

    }
};

export {reducerServices};