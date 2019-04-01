import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import Authenticate from './containers/Authenticate';
import Todos from './components/Todos';
import PrivateRoute from './containers/PrivateRoute';
import AppHeader from './containers/AppHeader';
import 'todomvc-app-css/index.css';

const store = createStore(combineReducers({
  ...reducers,
// eslint-disable-next-line no-undef
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <Router>
      <div>
        <h1>todos</h1>
        <AppHeader />
        <Switch>
          <Route
            component={Authenticate}
            exact
            path="/"
          />
          <Route
            component={Authenticate}
            path="/authenticate"
          />
          <PrivateRoute
            component={Todos}
            path="/todos"
          />
        </Switch>
      </div>
    </Router>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
