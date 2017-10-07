import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import pathOr from 'ramda/src/pathOr';
import omit from 'ramda/src/omit';

import Amount from '../components/Amount';

const amount = pathOr('', ['amount']);

@inject('store')
@observer
class ModificationAmount extends Component {
    addProduct = event => {
        const {store, modificationId} = this.props;
        const amount = parseInt(event.target.value, 10);

        if (amount <= 0) {
            store.removeOrderItem(modificationId);
        } else {
            store.addOrderItem(modificationId, amount);
        }
    };

    @computed
    get currentAmount() {
        const {store, modificationId} = this.props;
        const item = store.orderItems[modificationId];

        return amount(item);
    }

    render() {
        const props = omit(['as'], this.props);

        return (
            <Amount {...props}
                    value={this.currentAmount}
                    onChange={this.addProduct}/>
        );
    }
}

export default ModificationAmount;
