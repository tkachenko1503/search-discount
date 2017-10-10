import {fromPromise} from 'mobx-utils';

import store from '../store';
import Parse from './Parse';
import {modificationsWithMatchedProductQuery, modificationsQuery} from './queries';
import {normalizeModifications, throwOnError, openForDownload} from './utils';

let host = process.env.NODE_ENV !== 'production' ?
    'http://localhost:8090' :
    '';

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
        const request = fetch(`${host}/checkout`, {
            method: "POST",
            body: html
        })
            .then(throwOnError);

        const checkoutstate = fromPromise(request);

        checkoutstate
            .then(response => response.blob())
            .then(pdf => openForDownload(pdf))
            .catch(error => console.log('checkout error'));

        this._store.setCheckout(checkoutstate);
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
