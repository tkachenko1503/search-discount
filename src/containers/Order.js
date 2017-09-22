import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import reduce from 'ramda/src/reduce';
import keys from 'ramda/src/keys';
import length from 'ramda/src/length';
import pipe from 'ramda/src/pipe';
import pick from 'ramda/src/pick';
import values from 'ramda/src/values';

import api from '../api';

const sumPrices = (total, {price}) => total + price;
const keysLength = pipe(keys, length);

@inject('store')
@observer
class Order extends Component {
    @computed
    get total() {
        const {store} = this.props;
        const items = keys(store.orderItems);
        const products = pick(items, store.products);
        const productsList = values(products);

        return reduce(sumPrices, 0, productsList);
    }

    @computed
    get isVisible() {
        const {store} = this.props;

        return keysLength(store.orderItems) > 0;
    }

    render() {
        const {as: Component} = this.props;

        if (!this.isVisible) {
            return null;
        }

        return (
            <Component total={this.total}/>
        );
    }
}

export default Order;
