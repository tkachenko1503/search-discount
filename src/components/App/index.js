import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools';

import ProductSearchForm from '../ProductSearchForm';
import ProductsTable from '../ProductsTable';

import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <DevTools/>

                <h2 className={styles.logo}>Hello</h2>

                <ProductSearchForm className={styles.search}/>

                <ProductsTable/>
            </div>
        );
    }
}

export default App;
