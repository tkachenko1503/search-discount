import {action} from 'mobx';

export const resetProducts = action((products, newProducts) => {
    products.replace(newProducts);
});
