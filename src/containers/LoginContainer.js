import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import path from 'ramda/src/path';

import api from '../api';
import Login from '../components/Login';

@inject('store')
@observer
class LoginContainer extends Component {
    @observable formError = null;

    @action
    setFormError = error =>
        this.formError = error;

    goHome = () => {
        const {history} = this.props;

        history.push('/');
    };

    loginUser = (event) => {
        event.preventDefault();

        const form = event.target;

        api.login({
            username: path(['elements', 'username', 'value'], form),
            password: path(['elements', 'password', 'value'], form)
        })
            .then(this.goHome)
            .fail(this.setFormError);
    };

    render() {
        const Component = this.props.as || Login;

        return (
            <Component onSubmit={this.loginUser} error={this.formError}/>
        );
    }
}

export default withRouter(LoginContainer);
