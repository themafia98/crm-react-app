import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'normalize.css';

ReactDOM.render(
    <BrowserRouter basename = {process.env.PUBLIC_URL}>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
    );


serviceWorker.unregister();
