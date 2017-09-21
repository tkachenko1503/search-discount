import {observable, computed, action} from 'mobx';
import reduce from 'ramda/src/reduce';
import assoc from 'ramda/src/assoc';

const sumPrices = (total, {price}) => total + price;

class Store {
    @observable products = {};
    @observable orderItems = {};

    @computed get orderTotal() {
        return reduce(sumPrices, 0, this.orderItems);
    }

    @action
    resetProducts(newProducts) {
        this.products = newProducts;
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
