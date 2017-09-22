import React, {Component} from 'react';
import {observable, action, autorun} from 'mobx';
import {observer, inject} from 'mobx-react';

import SearchField from '../components/SearchField';

import api from '../api';

@inject('store')
@observer
class ProductSearch extends Component {
    @observable productName = '';

    disposeSearch = autorun(_ => {
        if (this.productName.length > 3) {
            api.fetchProducts(this.productName);
        }
    });

    @action
    setUserInput = event => {
        this.productName = event.target.value;
    };

    componentWillUnmount() {
        this.disposeSearch();
    }

    render() {
        return (
            <SearchField className={this.props.className}
                         value={this.productName}
                         onChange={this.setUserInput}/>
        );
    }
}

export default ProductSearch;
