import {UPDATE_SERVICES_TYPE, LOAD_PRICE_CARDS} from '../actions/servicesActions';

const initialState = {
    servicesType: null,
    content: null,
    cards: {
        type: '',
        storeCards: [],
    }
};

const reducerServices = (state = initialState, action) => {

    switch(action.type){
        case UPDATE_SERVICES_TYPE: return {
            ...state,
            servicesType: action.update.servicesType,
            content: [...action.update.content],
        }
        case LOAD_PRICE_CARDS: return {
            ...state,
            cards: {
                ...state.cards,
                type: action.payload.type,
                storeCards: [...action.payload.cards]
            }
        }
        default: return state;

    }
};

export {reducerServices};