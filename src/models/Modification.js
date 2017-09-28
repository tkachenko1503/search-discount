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

    static findModifications() {
        const query = new Parse.Query(Modification);

        return query
            .include(['product.category'])
            .find();
    }
}

export default Modification;
