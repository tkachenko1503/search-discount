import React, {Component} from 'react';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import omit from 'ramda/src/omit';
import pathOr from 'ramda/src/pathOr';
import pipe from 'ramda/src/pipe';
import filter from 'ramda/src/filter';
import propEq from 'ramda/src/propEq';

const modifications = pathOr([], ['entities', 'modification']);

@inject('store')
@observer
class ProductsByCategory extends Component {
    @computed
    get productModifications() {
        const {store, productId} = this.props;
        const findModifications = pipe(
            modifications,
            filter(propEq('product', productId))
        );

        return findModifications(store);
    }

    render() {
        const {as: Component} = this.props;
        const props = omit(['as'], this.props);

        return (
            <Component {...props}
                       modifications={this.productModifications}/>
        );
    }
}

export default ProductsByCategory;
