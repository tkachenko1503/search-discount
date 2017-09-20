import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import map from 'ramda/src/map';
import addIndex from 'ramda/src/addIndex';
import values from 'ramda/src/values';
import pipe from 'ramda/src/pipe';

import ProductAmount from '../ProductAmount';
import productsContainer from '../../containers/productsContainer';

const mapIndexed = addIndex(map);

class ProductsTableRow extends Component {
    render() {
        const {product} = this.props;

        return (
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>
                <td>
                    <ProductAmount/>
                </td>
            </tr>
        );
    }
}

const makeProductRows = pipe(
    values,
    mapIndexed((product, id) => <ProductsTableRow key={id} product={product}/>)
);

@productsContainer
class ProductsTable extends Component {
    render() {
        const {products} = this.props;
        const rows = makeProductRows(products);

        return (
            <Table responsive
                   bordered
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
                    {rows}
                </tbody>
            </Table>
        );
    }
}

export default ProductsTable;
