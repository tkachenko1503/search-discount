import React from 'react';
import {Table} from 'react-bootstrap';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import pipe from 'ramda/src/pipe';

import ProductListItem from '../ProductListItem';

const makeProducts = pipe(
    values,
    map(product => <ProductListItem key={product.id} product={product}/>)
);

const ProductsList = ({products}) => {
    return (
        <Table responsive
               striped>
            <thead>
            <tr>
                <th>Product name</th>
                <th>Product price</th>
                <th>Product discount</th>
                <th>Product amount</th>
            </tr>
            </thead>
            <tbody>
            {makeProducts(products)}
            </tbody>
        </Table>
    );
};

export default ProductsList;
