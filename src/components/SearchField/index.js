import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';

import styles from './SearchField.module.css';

const SearchField = ({value, onChange}) => {
    return (
        <Form className={styles.searchForm}>
            <FormGroup>
                <FormControl type="text"
                             bsSize="large"
                             placeholder="Быстрый поиск"
                             className={styles.searchControl}
                             value={value}
                             onChange={onChange}/>
            </FormGroup>
        </Form>
    );
};

export default SearchField;
