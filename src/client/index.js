import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createHashHistory';
import {Route} from 'react-router';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';

import reducers from './reducers';
import LogIn from './containers/LogIn';
import Register from './containers/Register';
import VerifyRegistration from './containers/VerifyRegistration';
import Todos from './components/Todos';
import PrivateRoute from './components/PrivateRoute';
import 'todomvc-app-css/index.css';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route
                    component={LogIn}
                    exact
                    path="/"
                />
                <Route
                    component={LogIn}
                    path="/login"
                />
                <Route
                    component={Register}
                    path="/register"
                />
                <Route
                    component={VerifyRegistration}
                    path="/verify-registration"
                />
                <PrivateRoute
                    component={Todos}
                    path="/todos"
                />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
