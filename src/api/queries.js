import Parse from '../api/Parse';
import Product from '../models/Product';
import Modification from '../models/Modification';

export const modificationsWithMatchedProductQuery = (prop, matcher) => {
    const productQuery = new Parse.Query(Product);
    const modificationQuery = new Parse.Query(Modification);

    productQuery.matches(prop, matcher);

    return modificationQuery
        .include(['product.category'])
        .matchesQuery('product', productQuery);
};

export const modificationsQuery = () => {
    const query = new Parse.Query(Modification);

    return query
        .include(['product.category']);
};
