import React from 'react';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import pipe from 'ramda/src/pipe';

import Product from '../Product';
import ProductFields from '../ProductFields';

const makeProducts = pipe(
    map(product => <Product key={product.objectId} product={product}/>),
    values
);

const ProductList = ({products}) => {
    return (
        <div>
            <ProductFields/>
            {makeProducts(products)}
        </div>
    );
};

export default ProductList;
