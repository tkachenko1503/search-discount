import React, {Component} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';

import styles from './ProductAmount.module.css';

class ProductAmount extends Component {
    render() {
        const {product} = this.props;

        return (
            <InputGroup className={styles.amount}>
                <FormControl type="number"/>
                <InputGroup.Addon>шт.</InputGroup.Addon>
            </InputGroup>
        );
    }
}

export default ProductAmount;
