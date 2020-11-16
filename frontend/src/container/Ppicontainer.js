import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Carros from '../components/Carros';
import Login from '../components/Login'
import Menu from '../components/Menu'
import Registro from '../components/Registro'


export default function Ppicontainer() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/menu" component={Menu}/>
      <Route exact path="/app" component={Carros}/>
      <Route exact path="/registro" component={Registro}/>
    </Switch>
  </BrowserRouter>
  );
}
