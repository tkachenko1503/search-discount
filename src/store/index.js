import {observable, action} from 'mobx';
import assoc from 'ramda/src/assoc';

class Store {
    @observable entities = {};
    @observable orderItems = {};

    @action
    resetProducts(newProducts) {
        this.products = newProducts;
    }

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
}

export default new Store();
