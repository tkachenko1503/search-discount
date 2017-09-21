import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import Amount from '../components/Amount';
import {addOrderItem} from '../stores/order/actions';

@inject('order')
@observer
class ProductAmount extends Component {
    constructor(props) {
        super(props);

        this.addProduct = this.addProduct.bind(this);
    }

    addProduct({target}) {
        const {order, productId} = this.props;
        const amount = target.value;

        addOrderItem(order, productId, amount);
    }

    render() {
        return (
            <Amount onChange={this.addProduct}/>
        );
    }
}

export default ProductAmount;
