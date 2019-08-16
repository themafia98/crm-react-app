import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from './Pages/Index/Index';
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';

class App extends React.PureComponent {


  render(){

    return (
      <Switch>
        <Route exact path = '/' component = {Index}></Route>
        <Route exact path = '/About' component = {About}></Route>
        <Route exact path = '/Contact' component = {Contact}></Route>
      </Switch>
    )
  }
}

export default App;