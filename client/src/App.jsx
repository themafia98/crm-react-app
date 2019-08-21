import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from './Pages/Index/Index';
import Services from './Pages/Services/Services';
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';

const App = () => {
    return (
      <Switch>
        <Route exact path = '/' component = {Index} />
        <Route  path = '/About' component = {About} />
        <Route  path = '/Contact' component = {Contact} />
        <Route exact path = '/Services' component = {Services} />
        <Route exact path = '*' component = {Index} />
      </Switch>
    )
};

export default App;