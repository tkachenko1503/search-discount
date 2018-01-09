import {observable, action} from 'mobx';
import assoc from 'ramda/src/assoc';
import omit from 'ramda/src/omit';

import Parse from '../api/Parse';

class Store {
    constructor({user}) {
        if (user) {
            if (this.userSessionIsActive()) {
                this.user = user.toJSON();
            } else {
                Parse.User.logOut();
            }
        }
    }

    @observable entities = {};
    @observable entitiesRequest = null;
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
    setEntitiesRequest(state) {
        this.entitiesRequest = state;
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

    userSessionIsActive() {
        const now = Date.now();
        const sessionCreated = parseInt(localStorage.getItem('user-session-created'), 10);
        const sessionIsActive = sessionCreated > 0 && (now - sessionCreated) < 1800000;

        return sessionIsActive;
    }

    saveUserSession() {
        const now = Date.now();

        localStorage.setItem('user-session-created', String(now));
    }

    resetUserSession() {
        localStorage.setItem('user-session-created', '0');
    }
}

const defaultState = {
    user: Parse.User.current()
};

export default new Store(defaultState);
