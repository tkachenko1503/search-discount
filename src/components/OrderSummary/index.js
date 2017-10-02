import React from 'react';
import {Button} from 'react-bootstrap';
import cn from 'classnames';

import styles from './OrderSummary.module.css';

const OrderSummary = ({total}) => {
    return (
        <div className={styles.summary}>
            <Button type="submit"
                    bsSize="large"
                    className={styles.checkout}>
                Оформить заказ
            </Button>

            <div className={cn(
                'pull-right',
                styles.clientTotal
            )}>
                <span>Цена клиенту: {total}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
