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
        const request = modificationsWithMatchedProductQuery('name', new RegExp(productName, 'i'))
            .find();

        const observableRequest = fromPromise(request);

        observableRequest
            .then(normalizeModifications)
            .then(entities => this._store.resetEntities(entities));

        this._store.setEntitiesRequest(observableRequest);
    }

    fetchEntities() {
        const request = modificationsQuery()
            .find();

        const observableRequest = fromPromise(request);

        observableRequest
            .then(normalizeModifications)
            .then(entities => this._store.resetEntities(entities));

        this._store.setEntitiesRequest(observableRequest);
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
        const currentUser = Parse.User.current();

        if (!currentUser) {
            return false;
        }

        return this._store.userSessionIsActive();
    }

    login({username, password}) {
        return Parse.User
            .logIn(username, password)
            .then((user) => {
                this._store.saveUserSession();
                return user;
            });
    }

    logout() {
        return Parse.User
            .logOut()
            .then(this._store.resetUserSession);
    }
}

export default new Api(store);
