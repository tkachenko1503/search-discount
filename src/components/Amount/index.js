import React, {Component} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';

import styles from './Amount.module.css';

class Amount extends Component {
    render() {
        const {value, onChange} = this.props;

        return (
            <InputGroup className={styles.amount}>
                <FormControl type="number"
                             value={value}
                             onChange={onChange}/>

                <InputGroup.Addon>шт.</InputGroup.Addon>
            </InputGroup>
        );
    }
}

export default Amount;
