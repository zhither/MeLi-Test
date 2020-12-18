import React from 'react';
import './App.scss';

// dependencies
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Home } from './components';
import List from './components/list/List';
import Navbar from './components/navbar/Navbar';
import Detail from './components/detail/Detail';

function App() {
  return (
    <Router>
        <Navbar>
          {
            props => (
              <Switch>
                <Route path='/item/:id'>
                  <Detail data={props}></Detail>
                </Route>
                <Route path='/items'>
                  <List data={props}></List>
                </Route>
                <Route exact path='/'>
                  <Home></Home>
                </Route>
              </Switch>
            )
          }
        </Navbar>
    </Router>
  );
}

export default App;
