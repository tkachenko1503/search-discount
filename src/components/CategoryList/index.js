import React from 'react';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import pipe from 'ramda/src/pipe';

import Category from '../Category';

import styles from './CategoryList.module.css';

const makeCategories = pipe(
    map(category => <Category key={category.objectId} category={category}/>),
    values
);

const CategoryList = ({categories}) => {
    return (
        <div className={styles.categories}>
            {makeCategories(categories)}
        </div>
    );
};

export default CategoryList;
