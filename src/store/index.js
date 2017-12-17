import {observable, action} from 'mobx';
import assoc from 'ramda/src/assoc';
import omit from 'ramda/src/omit';

import Parse from '../api/Parse';

class Store {
    constructor({user}) {
        this.user = user.toJSON();
    }

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
    removeOrderItem(modificationId) {
        const item = this.orderItems[modificationId];

        if (item) {
            this.orderItems = omit([modificationId], this.orderItems);
        }
    }

    @action
    setCheckout(state) {
        this.checkoutState = state;
    }

    @action
    resetCheckout() {
        this.checkoutState = null;
        this.orderItems = {};
    }

    @action
    setUser(user) {
        this.user = user.toJSON();
    }
}

const defaultState = {
    user: Parse.User.current()
};

export default new Store(defaultState);
