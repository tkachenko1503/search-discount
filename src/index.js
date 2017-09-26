import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
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
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    );

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={redirectOnAnonim(Component)}/>
);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <div>
                <PrivateRoute exact
                              path="/"
                              component={App}/>

                <Route path="/login"
                       component={LoginContainer}/>
            </div>
        </Provider>
    </Router>,
    document.getElementById('root')
);
