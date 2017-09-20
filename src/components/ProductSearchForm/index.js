import React, {Component} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

class ProductSearchForm extends Component {
    render() {
        const {value, onChange, className} = this.props;

        return (
            <form className={className}>
                <FormGroup>
                    <FormControl type="text"
                                 value={value}
                                 placeholder="Введите текст"
                                 onChange={onChange}/>
                </FormGroup>
            </form>
        );
    }
}

export default ProductSearchForm;
