import Parse from '../api/Parse';

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
}

export default Modification;
