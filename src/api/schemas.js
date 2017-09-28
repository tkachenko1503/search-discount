import {schema} from 'normalizr';

const categorySchema = new schema.Entity(
    'category',
    {},
    {idAttribute: 'objectId'});

const productSchema = new schema.Entity(
    'product',
    {category: categorySchema},
    {idAttribute: 'objectId'}
);

const modificationSchema = new schema.Entity(
    'modification',
    {product: productSchema},
    {idAttribute: 'objectId'}
);

export const entitiesSchema = new schema.Array(modificationSchema);
