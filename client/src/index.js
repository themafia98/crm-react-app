import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'normalize.css';

const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL, // The base URL of the app (see below)
    forceRefresh: false, // Set true to force full page refreshes
    keyLength: 6, // The length of location.key
  });
console.log(history);
ReactDOM.render(
    <BrowserRouter history={history} basename = {process.env.PUBLIC_URL}>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
    );


serviceWorker.unregister();
