import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createHashHistory';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';

import reducers from './reducers';
import Authenticate from './containers/Authenticate';
import Register from './containers/Register';
import VerifyRegistration from './containers/VerifyRegistration';
import Todos from './components/Todos';
import PrivateRoute from './containers/PrivateRoute';
import AppHeader from './containers/AppHeader';
import 'todomvc-app-css/index.css';

const history = createHistory();

const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    ...reducers,
    router: routerReducer
}), composeEnhancers(
    applyMiddleware(middleware)
));

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <h1>{'todos'}</h1>
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
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
