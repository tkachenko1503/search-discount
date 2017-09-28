import store from '../store';
import Parse from './Parse';
import Modification from '../models/Modification';
import {normalizeModifications} from './utils';

export class Api {
    constructor(store) {
        this._store = store;
    }

    fetchProducts(productName) {
        Modification
            .findModifications()
            .then(normalizeModifications)
            .then(entities => this._store.resetEntities(entities));
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
