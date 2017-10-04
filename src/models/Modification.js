import Parse from 'parse';

class Modification extends Parse.Object {
    // name = '';
    // size = '';
    // paletSize = 0;
    // weight = 0;
    // price = 0;
    // discount = 0;
    // product = null;

    constructor() {
        super('Modification');
    }

    static queryWithEntities() {
        const query = new Parse.Query(Modification);

        return query
            .include(['product.category']);
    }
}

export default Modification;