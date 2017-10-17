import Parse from '../api/Parse';
import Product from '../models/Product';
import Modification from '../models/Modification';

export const modificationsWithMatchedProductQuery = (prop, matcher) => {
    const productQuery = new Parse.Query(Product);
    const modificationQuery = new Parse.Query(Modification);

    productQuery.matches(prop, matcher);

    return modificationQuery
        .limit(1000)
        .include(['product.category'])
        .matchesQuery('product', productQuery);
};

export const modificationsQuery = () => {
    const query = new Parse.Query(Modification);

    return query
        .limit(2000)
        .include(['product.category']);
};
