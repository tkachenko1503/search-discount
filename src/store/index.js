import {observable, action} from 'mobx';
import assoc from 'ramda/src/assoc';

class Store {
    @observable entities = {};
    @observable orderItems = {};
    @observable checkoutState = null;

    @action
    resetEntities({entities}) {
        this.entities = entities;
    }

    @action
    addOrderItem(modificationId, amount) {
        const item = this.orderItems[modificationId];

        if (item) {
            item.amount = amount;
        } else {
            let newItem = observable({
                modificationId,
                amount
            });

            this.orderItems = assoc(modificationId, newItem, this.orderItems);
        }
    }

    @action
    setCheckout(state) {
        this.checkoutState = state;
    }
}

export default new Store();
