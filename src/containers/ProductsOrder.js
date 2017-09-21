import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import ProductsList from '../components/ProductsList';

@inject('products')
@observer
class ProductsOrder extends Component {
    render() {
        const {products} = this.props;

        return (
            <ProductsList products={products}/>
        );
    }
}

export default ProductsOrder;
