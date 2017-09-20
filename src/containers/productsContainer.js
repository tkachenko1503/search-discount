import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import omit from 'ramda/src/omit';

const productsContainer = (Component) => {
    @inject('productsStore')
    @observer
    class ProductsContainer extends Component {
        render() {
            const cleanedProps = omit(['productsStore'], this.props);

            return (
                <Component {...cleanedProps} products={this.props.productsStore}/>
            );
        }
    }

    return ProductsContainer;
};

export default target => productsContainer(target);
