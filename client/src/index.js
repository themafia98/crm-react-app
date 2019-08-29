import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import store from './Redux/store';

import './index.scss';
import 'normalize.css';

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter basename = {process.env.PUBLIC_URL}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
    );


serviceWorker.unregister();
