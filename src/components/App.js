import React from 'react';

import {
   BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router'

import Login from './Login';
import LaunchScreen from './LaunchScreen';
import Benevits from '../components/Benevits';

import history from '../history';

const App = (props) => {

  return (
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route exact path="/" component={LaunchScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/benevits" component={Benevits} />
        </Switch>
      </Router>
    </ConnectedRouter>
  );
};

export default App;
