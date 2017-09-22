import React from 'react';

import ProductAmount from '../../containers/ProductAmount';

const ProductListItem = ({product}) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.discount}</td>
            <td>
                <ProductAmount productId={product.id}/>
            </td>
        </tr>
    );
};

export default ProductListItem;
