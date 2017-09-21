import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools';

import ProductSearchForm from '../ProductSearchForm';
import ProductsOrder from '../../containers/ProductsOrder';

import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <DevTools/>

                <h2 className={styles.logo}>Hello</h2>

                <ProductSearchForm className={styles.search}/>

                <ProductsOrder/>
            </div>
        );
    }
}

export default App;
