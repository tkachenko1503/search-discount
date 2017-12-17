import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import path from 'ramda/src/path';
import omit from 'ramda/src/omit';

import api from '../api';

@inject('store')
@observer
class Login extends Component {
    @observable formError = null;

    @action
    setFormError = error =>
        this.formError = error;

    goHome = () => {
        const {history} = this.props;

        history.push('/');
    };

    setUserData = (user) => {
        const {store} = this.props;

        store.setUser(user);
    };

    loginUser = (event) => {
        event.preventDefault();

        const form = event.target;

        api
            .login({
                username: path(['elements', 'username', 'value'], form),
                password: path(['elements', 'password', 'value'], form)
            })
            .then(this.setUserData)
            .then(this.goHome)
            .fail(this.setFormError);
    };

    render() {
        const Component = this.props.as;
        const props = omit(['as'], this.props);

        return (
            <Component {...props}
                       onSubmit={this.loginUser}
                       error={this.formError}/>
        );
    }
}

export default withRouter(Login);
