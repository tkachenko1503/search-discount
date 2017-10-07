import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import omit from 'ramda/src/omit';
import pathOr from 'ramda/src/pathOr';
import values from 'ramda/src/values';
import prop from 'ramda/src/prop';
import reduce from 'ramda/src/reduce';
import add from 'ramda/src/add';
import map from 'ramda/src/map';
import pipe from 'ramda/src/pipe';
import partialRight from 'ramda/src/partialRight';
import pick from 'ramda/src/pick';
import keys from 'ramda/src/keys';

import {numToWords} from '../utils/numbers';

const orderItems = pathOr({}, ['orderItems']);
const modifications = pathOr([], ['entities', 'modification']);

const weights = prop('weight');
const sumWeights = reduce(add, 0);
const totalWeights = pipe(
    map(weights),
    sumWeights
);
const monthes = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа',
    'Сентября', 'Октября', 'Ноября', 'Декабря',
];

@inject('store')
@observer
class Check extends Component {
    render() {
        const {store, as: Component} = this.props;
        const props = omit(['as'], this.props);

        const items = orderItems(store);
        const allModifications = modifications(store);
        const currentDate = new Date();
        const randomNumber = Math.round(100 + Math.random() * (999 - 100));

        const orderModifications = pipe(
            keys,
            partialRight(pick, [allModifications]),
            values
        )(items);

        const totalPrice = reduce((total, mod) => {
            return total + (mod.price * items[mod.objectId].amount);
        }, 0, orderModifications);

        return (
            <Component {...props}
                       itemsLength={orderModifications.length}
                       orderId={`${currentDate.toLocaleDateString()}/${randomNumber}`}
                       orderDate={`${currentDate.getDate()} ${monthes[currentDate.getMonth()]} ${currentDate.getFullYear()} г.`}
                       totalPrice={totalPrice}
                       totalWeight={totalWeights(orderModifications)}
                       totalPriceText={numToWords(totalPrice)}/>
        );
    }
}

export default Check;
