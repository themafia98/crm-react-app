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
