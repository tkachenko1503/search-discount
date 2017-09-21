import React, {Component} from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';

class ProductSearchForm extends Component {
    render() {
        const {value, onChange, className} = this.props;

        return (
            <Form className={className}>
                <FormGroup>
                    <FormControl type="text"
                                 value={value}
                                 placeholder="Введите текст"
                                 onChange={onChange}/>
                </FormGroup>
            </Form>
        );
    }
}

export default ProductSearchForm;
