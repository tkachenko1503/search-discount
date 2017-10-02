import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';

import styles from './Amount.module.css';

const Amount = ({value, onChange}) => {
    return (
        <InputGroup className={styles.amount}>
            <FormControl type="number"
                         className={styles.amountControl}
                         value={value}
                         onChange={onChange}/>
        </InputGroup>
    );
};

export default Amount;
