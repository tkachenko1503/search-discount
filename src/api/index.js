import {fromPromise} from 'mobx-utils';

import store from '../store';
import Parse from './Parse';
import {modificationsWithMatchedProductQuery, modificationsQuery} from './queries';
import {normalizeModifications, openForDownload, openInBlankTab, checkoutRequest} from './utils';

export class Api {
    constructor(store) {
        this._store = store;
    }

    findProductsByName(productName) {
        modificationsWithMatchedProductQuery('name', new RegExp(productName, 'i'))
            .find()
            .then(normalizeModifications)
            .then(entities => this._store.resetEntities(entities));
    }

    fetchEntities() {
        modificationsQuery()
            .find()
            .then(normalizeModifications)
            .then(entities => this._store.resetEntities(entities));
    }

    checkout(html) {
        const request = checkoutRequest('issue', html);

        const checkoutstate = fromPromise(request);

        checkoutstate
            .then(response => response.blob())
            .then(pdf => openForDownload(pdf))
            .catch(error => console.log('checkout error'));

        this._store.setCheckout(checkoutstate);
    }

    getOrderPreview(html) {
        const request = checkoutRequest('order', html);

        const checkoutstate = fromPromise(request);

        checkoutstate
            .then(response => response.blob())
            .then(pdf => openInBlankTab(pdf))
            .catch(error => console.log('order preview error'));
    }

    isAuthenticated() {
        return Parse.User.current();
    }

    login({username, password}) {
        return Parse.User
            .logIn(username, password);
    }

    loguot() {
        return Parse.User
            .logOut();
    }
}

export default new Api(store);
