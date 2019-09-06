/** IE supports polyfills */
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/symbol';
import 'core-js/es/array/includes';
import 'core-js/es/array/find';
import 'core-js/es/string/includes';
import 'core-js/es/object/assign';
/** --------------------- */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import store from './Redux/store';

import './index.scss';
import 'normalize.css';

ReactDOM.render(
    <ErrorBoundary>
        <Provider store = {store}>
            <BrowserRouter basename = {process.env.PUBLIC_URL}>
                <App />
            </BrowserRouter>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
    );


serviceWorker.unregister();
