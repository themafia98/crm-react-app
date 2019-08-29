import {createStore} from 'redux';
import services from './combineReducers';

const store = createStore(
    services,  
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;