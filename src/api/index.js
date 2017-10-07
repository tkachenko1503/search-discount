import {fromPromise} from 'mobx-utils';

import store from '../store';
import Parse from './Parse';
import Modification from '../models/Modification';
import {normalizeModifications, throwOnError} from './utils';

let host = process.env.NODE_ENV !== 'production' ?
    'http://localhost:8090' :
    '';

export class Api {
    constructor(store) {
        this._store = store;
    }

    findProductsByName(productName) {
        Modification
            .queryWithEntities()
            .matches('name', new RegExp(productName, 'i'))
            .find()
            .then(normalizeModifications)
            .then(entities => this._store.resetEntities(entities));
    }

    fetchEntities() {
        Modification
            .queryWithEntities()
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

        checkoutstate.catch(error => console.log('checkout error'));

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
