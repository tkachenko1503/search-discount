import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import api from '../api';

@inject('store')
@observer
class Products extends Component {
    componentDidMount() {
        api.fetchProducts();
    }

    render() {
        const {store, as: Component} = this.props;

        return (
            <Component products={store.products}/>
        );
    }
}

export default Products;
