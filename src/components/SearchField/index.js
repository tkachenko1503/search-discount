import React, {Component} from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';

class SearchField extends Component {
    render() {
        const {value, onChange, className} = this.props;

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
    }
}

export default SearchField;
