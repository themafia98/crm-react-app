import {combineReducers} from 'redux';
import {reducerServices} from './reducers/services';

export default combineReducers({
    services: reducerServices,
});