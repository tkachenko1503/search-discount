import React from 'react';

import ProductList from '../ProductList';
import Products from '../../containers/Products';

import styles from './Category.module.css';

const Category = ({category}) => {
    return (
        <div className={styles.category}>
            <h3 className={styles.categoryTitle}>
                {category.name}
            </h3>
            <Products categoryId={category.objectId}
                      as={ProductList}/>
        </div>
    );
};

export default Category;
