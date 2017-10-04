import React from 'react';
import Loader from 'react-loader';
import {Button, Alert} from 'react-bootstrap';
import cn from 'classnames';

import styles from './OrderSummary.module.css';

const CheckoutForm = ({htmlDocRef, checkoutOrder, total}) => {
    return (
        <div>
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

            <div ref={htmlDocRef}>
                Order YOHOHO
            </div>
        </div>
    );
};

const CheckoutLoader = () => {
    return (
        <Alert bsStyle="info"
               className={styles.checkoutMessage}>
            <Loader loaded={false}/>
        </Alert>
    );
};

const CheckoutSucceed = ({resetCheckout}) => {
    return (
        <Alert bsStyle="success"
               className={styles.checkoutMessage}>
            <div>
                Заказ отправлен.
            </div>

            <Button onClick={resetCheckout}>
                Закрыть
            </Button>
        </Alert>
    );
};

const CheckoutFailed = ({checkoutOrder}) => {
    return (
        <Alert bsStyle="danger"
               className={styles.checkoutMessage}>
            <div>
                Произошла ошибка. Попробуйте еще раз.
            </div>

            <Button onClick={checkoutOrder}>
                Повторить
            </Button>
        </Alert>
    );
};

const OrderSummary = (props) => {
    let ContentComponent;

    switch (props.checkoutState) {
        case 'pending':
            ContentComponent = CheckoutLoader;
            break;

        case 'fulfilled':
            ContentComponent = CheckoutSucceed;
            break;

        case 'rejected':
            ContentComponent = CheckoutFailed;
            break;

        default:
            ContentComponent = CheckoutForm;
    }

    return (
        <div className={styles.summary}>
            <ContentComponent {...props}/>
        </div>
    )
};

export default OrderSummary;
