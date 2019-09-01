import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import services from './combineReducers';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV !== 'production'
    ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const store = createStore(
    services, composeEnhancers(applyMiddleware(thunk))
);

export default store;