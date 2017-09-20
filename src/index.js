import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import App from './components/App';
import productsStore from './stores/products';

useStrict(true);

ReactDOM.render(
    <Provider productsStore={productsStore}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
