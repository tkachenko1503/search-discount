import React from 'react';
import {Button} from 'react-bootstrap';
import cn from 'classnames';

import styles from './OrderSummary.module.css';

const messageByState = (state) => {
    switch (state) {
        case 'pending':
            return 'Loading';

        case 'fulfilled':
            return 'Success';

        case 'rejected':
            return 'Fail';

        default:
            return null;
    }
};

const OrderSummary = ({htmlDocRef, checkoutOrder, total, checkoutState}) => {
    return (
        <div className={styles.summary}>
            <Button type="submit"
                    bsSize="large"
                    onClick={checkoutOrder}
                    className={styles.checkout}>
                Оформить заказ
            </Button>

            <div className={cn(
                'pull-right',
                styles.clientTotal
            )}>
                <span>Цена клиенту: {total}</span>
            </div>

            {messageByState(checkoutState)}

            <div ref={htmlDocRef}>
                Order
            </div>
        </div>
    );
};

export default OrderSummary;
