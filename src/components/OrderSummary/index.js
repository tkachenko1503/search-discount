import React from 'react';
import Loader from 'react-loader';
import {Button, Alert} from 'react-bootstrap';
import cn from 'classnames';

import Check from '../../containers/Check';
import EmailCheck from '../EmailCheck';
import User from '../../containers/User';
import UserMenu from '../UserMenu';

import styles from './OrderSummary.module.css';

const CheckoutForm = ({checkoutOrder, openOrderPreview, total, canOrder}) => {
    const isDisabled = !canOrder;

    return (
        <div>
            <Button type="submit"
                    bsSize="large"
                    disabled={isDisabled}
                    onClick={openOrderPreview}
                    className={styles.showOrder}>
                Посмотреть заказ
            </Button>

            <Button type="submit"
                    bsSize="large"
                    disabled={isDisabled}
                    onClick={checkoutOrder}
                    className={styles.checkout}>
                Оформить заказ
            </Button>

            <div className={cn(
                'pull-right',
                styles.clientTotal
            )}>
                <span>Цена розница: {total} Р</span>
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
            <div className={styles.summaryContent}>
                <ContentComponent {...props}/>
            </div>

            <div className={styles.summaryUserMenu}>
                <User as={UserMenu}/>
            </div>

            <div style={{display: 'none'}}
                 ref={props.htmlDocRef}>
                <Check as={EmailCheck}/>
            </div>
        </div>
    )
};

export default OrderSummary;
