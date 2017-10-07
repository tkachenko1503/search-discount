import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import omit from 'ramda/src/omit';
import pathOr from 'ramda/src/pathOr';

const products = pathOr([], ['entities', 'product']);
const modifications = pathOr([], ['entities', 'modification']);
const orderItems = pathOr([], ['orderItems']);

@inject('store')
@observer
class Order extends Component {
    @computed
    get items() {
        const {store} = this.props;
        const items = orderItems(store);
        const itemsList = values(items);
        const allModifications = modifications(store);
        const allProducts = products(store);

        return map(
            ({modificationId, amount}) => {
                const modification = allModifications[modificationId];
                const product = allProducts[modification.product];

                return {
                    amount,
                    name: `${product.name} ${modification.size} ${modification.name}`,
                    price: modification.price,
                    itemTotal: amount * modification.price
                };
            }, itemsList);
    }

    render() {
        const {as: Component} = this.props;

        const props = omit(['as'], this.props);

        return (
            <Component {...props}
                       items={this.items}/>
        );
    }
}

export default Order;
