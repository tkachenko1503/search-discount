import React, {Component} from 'react';
import {observable, action, autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import omit from 'ramda/src/omit';

import api from '../api';

@inject('store')
@observer
class ProductSearch extends Component {
    @observable productName = '';

    disposeSearch = autorun(_ => {
        const name = this.productName
            .trim()
            .replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');

        if (name.length > 2) {
            api.findProductsByName(name);
        } else {
            api.fetchEntities();
        }
    });

    @action
    setUserInput = event => {
        this.productName = event.target.value;
    };

    componentDidMount() {
        api.fetchEntities();
    }

    componentWillUnmount() {
        this.disposeSearch();
    }

    render() {
        const {as: Component} = this.props;
        const props = omit(['as'], this.props);

        return (
            <Component {...props}
                       value={this.productName}
                       onChange={this.setUserInput}/>
        );
    }
}

export default ProductSearch;
