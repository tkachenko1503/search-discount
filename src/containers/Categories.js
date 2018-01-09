import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Loader from 'react-loader';
import omit from 'ramda/src/omit';
import pathOr from 'ramda/src/pathOr';

const categories = pathOr([], ['entities', 'category']);

@inject('store')
@observer
class Categories extends Component {
    render() {
        const {store, as: Component} = this.props;
        const props = omit(['as'], this.props);
        const {entitiesRequest} = store;

        if (!entitiesRequest || entitiesRequest && entitiesRequest.state === 'pending') {
            return (
                <Loader loaded={false}/>
            );
        }

        return (
            <Component {...props}
                       categories={categories(store)}/>
        );
    }
}

export default Categories;
