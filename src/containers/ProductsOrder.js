import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import ProductsList from '../components/ProductsList';

import api from '../api';

@inject('store')
@observer
class ProductsOrder extends Component {
    componentDidMount() {
        api.fetchProducts();
    }

    render() {
        const {store} = this.props;

        return (
            <ProductsList products={store.products}/>
        );
    }
}

export default ProductsOrder;
