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
    addOrderItem(productId, amount) {
        const item = this.orderItems[productId];

        if (item) {
            item.amount = amount;
        } else {
            let newItem = observable({
                productId,
                amount
            });

            this.orderItems = assoc(productId, newItem, this.orderItems);
        }
    }
}

export default new Store();
