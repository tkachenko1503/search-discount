import React from 'react';
import DevTools from 'mobx-react-devtools';
import cn from 'classnames';

import CategoryList from '../CategoryList';
import OrderSummary from '../OrderSummary';
import SearchField from '../SearchField';

import Categories from '../../containers/Categories';
import Order from '../../containers/Order';
import ProductSearch from '../../containers/ProductSearch';

import styles from './SearchPage.module.css';

const SearchPage = () => {
    return (
        <div className={cn(
            'container-fluid',
            styles.search
        )}>
            <DevTools/>

            <div className={styles.searchContent}>
                <h1 className={styles.searchLogo}>
                    Формирование заказа
                </h1>

                <ProductSearch as={SearchField}/>

                <Categories as={CategoryList}/>

                <Order as={OrderSummary}/>
            </div>
        </div>
    );
};

export default SearchPage;
