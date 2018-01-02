import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import omit from 'ramda/src/omit';

import api from '../api';

@inject('store')
class User extends Component {
    goToLogin = () => {
        const {history} = this.props;

        history.push('/login');
    };

    logout = () => {
        api
            .logout()
            .then(this.goToLogin)
            .fail(error => console.log(error));
    };

    render() {
        const Component = this.props.as;
        const props = omit(['as'], this.props);
        const store = this.props.store;
        const user = store.user;

        return (
            <Component {...props}
                       {...user}
                       logout={this.logout}/>
        );
    }
}

export default withRouter(User);
