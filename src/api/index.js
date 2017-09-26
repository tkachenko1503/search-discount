import store from '../store';
import Parse from 'parse';

const devPort = 8090;
const hostname = window.location.hostname;
const url = window.location.protocol + '//' + hostname;

Parse.initialize('app-id', 'js-key');
Parse.serverURL = (hostname === 'localhost' ? url + ':' + devPort : url) + '/parse';

export class Api {
    constructor(store) {
        this._store = store;
    }

    fetchProducts(productName) {
        setTimeout(() => this._store.resetProducts({}), 2000);
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
