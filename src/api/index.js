import store from '../store';

import productsMock from './productsMock';

class Api {
    constructor(store) {
        this._store = store;
    }

    fetchProducts(productName) {
        setTimeout(() => this._store.resetProducts(productsMock), 2000);
    }
}

export default new Api(store);
