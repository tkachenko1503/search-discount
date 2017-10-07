import React from 'react';
import {Table} from 'react-bootstrap';
import map from 'ramda/src/map';
import addIndex from 'ramda/src/addIndex';

import styles from './EmailCheck.module.css';

const ItemsTableRow = ({index, name, amount, price, itemTotal}) => (
    <tr>
        <td>{index}</td>
        <td>{name}</td>
        <td>{amount}</td>
        <td>шт.</td>
        <td>{price}</td>
        <td>{itemTotal}</td>
        <td>Без ндс</td>
    </tr>
);

const mapIndexed = addIndex(map);

const makeItemsTableRows = mapIndexed((item, index) => (
    <ItemsTableRow {...item}
                   key={index}
                   index={index + 1}/>
));

const ItemsTable = ({items}) => (
    <Table>
        <thead>
        <tr>
            <th>№</th>
            <th>Товары (работы, услуги)</th>
            <th>Кол-во</th>
            <th>Ед.</th>
            <th>Цена</th>
            <th>Сумма</th>
            <th>НДС</th>
        </tr>
        </thead>

        <tbody>
        {makeItemsTableRows(items)}
        </tbody>
    </Table>
);

const EmailCheck = ({items}) => {
    return (
        <div>
            <ItemsTable items={items}/>

            <div>
                ВНИМАНИЕ!!! <br/>
                УСЛОВИЯ ПОСТАВКИ: <br/>
                1. Загрузка производится автопогрузчиком на поддонах ТОЛЬКО В БОРТОВЫЕ АВТОМОБИЛИ С БОКОВОЙ
                ЗАГРУЗКОЙ. <br/>
                2. Для погрузки необходимо предоставить счет на оплату и квитанцию об оплате. <br/>
                3. ВНИМАНИЕ: При заказе любого цвета, в связи с неоднородностью сыпучих материалов добываемых
                на карьерах, технически
                невозможно получить абсолютно одинаковую цветовую гамму, возможны изменения оттенка в светлую
                и темную сторону. <br/>
                4. При укладке бетонных блоков или тротуарной плитки, чтобы добиться лучшего эффекта необходимо
                выполнять укладку сразу с нескольких поддонов. <br/>
                5. После монтажа продукции претензии по качеству товара не принимаются
            </div>
        </div>
    );
};

export default EmailCheck;
