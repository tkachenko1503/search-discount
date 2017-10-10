import Parse from '../api/Parse';

class Product extends Parse.Object {
    // name = '';
    // category = null;

    constructor() {
        super('Product');
    }
}

export default Product;
