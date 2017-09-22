import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import pathOr from 'ramda/src/pathOr';

import Amount from '../components/Amount';

const amountOrZero = pathOr(0, ['amount']);

@inject('store')
@observer
class ProductAmount extends Component {
    addProduct = event => {
        const {store, productId} = this.props;
        const amount = parseInt(event.target.value, 10);

        store.addOrderItem(productId, amount);
    };

    @computed
    get currentAmount() {
        const {store, productId} = this.props;
        const item = store.orderItems[productId];

        return amountOrZero(item);
    }

    render() {
        return (
            <Amount value={this.currentAmount}
                    onChange={this.addProduct}/>
        );
    }
}

export default ProductAmount;
