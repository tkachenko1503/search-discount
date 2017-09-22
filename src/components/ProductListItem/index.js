import React, {Component} from 'react';

import ProductAmount from '../../containers/ProductAmount';

class ProductListItem extends Component {
    render() {
        const {product} = this.props;

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
    }
}

export default ProductListItem;
