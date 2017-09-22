import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';

const SearchField = ({value, onChange, className}) => {
    return (
        <Form className={className}>
            <FormGroup>
                <FormControl type="text"
                             placeholder="Введите название товара"
                             value={value}
                             onChange={onChange}/>
            </FormGroup>
        </Form>
    );
};

export default SearchField;
