import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import reduce from 'ramda/src/reduce';
import keys from 'ramda/src/keys';
import length from 'ramda/src/length';
import pipe from 'ramda/src/pipe';
import values from 'ramda/src/values';
import omit from 'ramda/src/omit';
import pathOr from 'ramda/src/pathOr';

const keysLength = pipe(keys, length);
const modifications = pathOr([], ['entities', 'modification']);
const orderItems = pathOr([], ['orderItems']);

@inject('store')
@observer
class Order extends Component {
    @computed
    get total() {
        const {store} = this.props;
        const items = orderItems(store);
        const itemsList = values(items);
        const allModifications = modifications(store);

        return reduce(
            (total, {modificationId, amount}) => {
                const modification = allModifications[modificationId];

                return total + (amount * modification.price);
            }, 0, itemsList);
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

        const props = omit(['as'], this.props);

        return (
            <Component {...props}
                       total={this.total}/>
        );
    }
}

export default Order;
