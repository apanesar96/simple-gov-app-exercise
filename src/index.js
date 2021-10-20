import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Homepage } from './pages/homepage/Homepage';
import { MyDetailsRoutes } from './pages/myDetails/MyDetailsRoutes';
import { FathersDetailsRoutes } from './pages/fathersDetails/FathersDetailsRoutes';
import MothersDetailsRoutes from './pages/mothersDetails/MothersDetailsRoutes';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MyDetailsRoutes />
      <FathersDetailsRoutes />
      <MothersDetailsRoutes />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
