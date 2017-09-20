import {observable, computed} from 'mobx';

import mock from './products.mock';

const products = observable(mock);

export default products;

// export const productsPrices = products =>
//     computed(() => products.map(p => p.price));
