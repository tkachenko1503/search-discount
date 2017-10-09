import React from 'react';

import ModificationList from '../ModificationList';
import Modifications from '../../containers/Modifications';

import styles from './Product.module.css';

const Product = ({product}) => {
    return (
        <div>
            <div className={styles.productName}>
                <b>
                    {product.name}
                </b>
            </div>

            <Modifications productId={product.objectId}
                                  as={ModificationList}/>
        </div>
    );
};

export default Product;
