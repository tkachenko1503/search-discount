import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import api from './api';
import App from './components/App';
import LoginContainer from './containers/LoginContainer';

import store from './store';

useStrict(true);

const redirectOnAnonim = Component =>
    props => (
        api.isAuthenticated() ?
            <Component {...props}/> :
            <Redirect to="/login"/>
    );

const redirectOnAuth = Component =>
    props => (
        api.isAuthenticated() ?
            <Redirect to="/"/> :
            <Component {...props}/>
    );

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={redirectOnAnonim(Component)}/>
);

const AnonimRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={redirectOnAuth(Component)}/>
);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <div id="app">
                <Switch>
                    <PrivateRoute exact path="/" component={App}/>
                    <AnonimRoute path="/login" component={LoginContainer}/>
                    <Redirect from="/*" to="/"/>
                </Switch>
            </div>
        </Provider>
    </Router>,
    document.getElementById('root')
);
