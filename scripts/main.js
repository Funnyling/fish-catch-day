import React  from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker}/>
      <Route path="/store/:storeId" component={App}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </BrowserRouter>
  , document.querySelector('#main'));
