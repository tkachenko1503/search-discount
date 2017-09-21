import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import App from './components/App';

import productsStore from './stores/products';
import orderStore from './stores/order';

useStrict(true);

ReactDOM.render(
    <Provider products={productsStore}
              order={orderStore}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
