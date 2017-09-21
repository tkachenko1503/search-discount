import {observable} from 'mobx';

import mock from './products.mock';

const products = observable(mock);

export default products;
