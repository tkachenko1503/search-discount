import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools';

import ProductsList from '../ProductsList';
import ProdutsOrder from '../ProdutsOrder';

import Products from '../../containers/Products';
import Order from '../../containers/Order';
import ProductSearch from '../../containers/ProductSearch';

import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <DevTools/>

                <h2 className={styles.logo}>
                    Hello
                </h2>

                <ProductSearch className={styles.search}/>

                <Products as={ProductsList}/>

                <Order as={ProdutsOrder}/>
            </div>
        );
    }
}

export default App;
