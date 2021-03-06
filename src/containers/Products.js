import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import omit from 'ramda/src/omit';
import pathOr from 'ramda/src/pathOr';
import pipe from 'ramda/src/pipe';
import filter from 'ramda/src/filter';
import propEq from 'ramda/src/propEq';

const products = pathOr([], ['entities', 'product']);

@inject('store')
@observer
class ProductsByCategory extends Component {
    @computed
    get categoryProducts() {
        const {store, categoryId} = this.props;
        const findProducts = pipe(
            products,
            filter(propEq('category', categoryId))
        );

        return findProducts(store);
    }

    render() {
        const {as: Component} = this.props;
        const props = omit(['as'], this.props);

        return (
            <Component {...props}
                       products={this.categoryProducts}/>
        );
    }
}

export default ProductsByCategory;
