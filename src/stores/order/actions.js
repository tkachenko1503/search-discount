import {action} from 'mobx';

export const addOrderItem = action((order, productId, amount) => {
    order.items[productId] = {
        productId,
        amount
    };
});
