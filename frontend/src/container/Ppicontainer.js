import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Carros from '../components/Carros';
import Login from '../components/Login'
import Registro from '../components/Registro'

import Login2 from '../components/Login2'

export default function Ppicontainer() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/app" component={Carros}/>
      <Route exact path="/registro" component={Registro}/>
      <Route exact path="/login" component={Login2}/>
    </Switch>
  </BrowserRouter>
  );
}
