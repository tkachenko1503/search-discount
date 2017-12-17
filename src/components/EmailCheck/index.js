import React from 'react';
import {Table} from 'react-bootstrap';
import map from 'ramda/src/map';
import addIndex from 'ramda/src/addIndex';
import merge from 'ramda/src/merge';

import OrderItems from '../../containers/OrderItems';

const tdStyle = {
    border: '1px solid #000'
};

const ItemsTableRow = ({index, name, amount, price, itemTotal}) => (
    <tr>
        <td style={tdStyle}>{index}</td>
        <td style={tdStyle}>{name}</td>
        <td style={merge(tdStyle, {textAlign: 'right', width: 70})}>{amount}</td>
        <td style={tdStyle}>шт.</td>
        <td style={merge(tdStyle, {textAlign: 'right', width: 70})}>{price}</td>
        <td style={merge(tdStyle, {textAlign: 'right'})}>{itemTotal}</td>
        <td style={merge(tdStyle, {textAlign: 'right', width: 75})}>Без ндс</td>
    </tr>
);

const mapIndexed = addIndex(map);

const makeItemsTableRows = mapIndexed((item, index) => (
    <ItemsTableRow {...item}
                   key={index}
                   index={index + 1}/>
));

const thStyle = {
    textAlign: 'center',
    border: '1px solid #000'
};

const ItemsTable = ({items, totalPrice, totalWeight}) => (
    <Table cellSpacing="0"
           cellPadding="4"
           style={{marginTop: 30, borderCollapse: 'collapse', width: '100%'}}>
        <thead>
        <tr>
            <th style={thStyle}>№</th>
            <th style={thStyle}>Товары (работы, услуги)</th>
            <th style={thStyle}>Кол-во</th>
            <th style={thStyle}>Ед.</th>
            <th style={thStyle}>Цена</th>
            <th style={thStyle}>Сумма</th>
            <th style={thStyle}>НДС</th>
        </tr>
        </thead>

        <tbody>
        {makeItemsTableRows(items)}
        <tr>
            <td colSpan={2}
                style={{textAlign: 'right', paddingRight: 30}}>
                Вес: {totalWeight} кг.
            </td>
            <td colSpan={3}
                style={{textAlign: 'right', paddingRight: 10}}>Итого
            </td>
            <td style={{textAlign: 'right'}}>{totalPrice}</td>
            <td></td>
        </tr>
        </tbody>
    </Table>
);

const EmailCheck = ({itemsLength, orderId, orderDate, totalPrice, totalWeight, totalPriceText, nickname}) => {
    return (
        <div style={{width: 900}}>
            <h3>Счет-заказ №{orderId} от {orderDate} от {nickname}</h3>

            <hr/>

            <OrderItems as={ItemsTable}
                        totalPrice={totalPrice}
                        totalWeight={totalWeight}/>

            <p>
                Всего наименований {itemsLength}, на сумму {totalPrice} руб.
                <br/>
                {totalPriceText}
            </p>

            <hr/>

            <div style={{marginTop: 30}}>
                <b>ВНИМАНИЕ!!!</b>
                <br/>
                УСЛОВИЯ ПОСТАВКИ:
                <br/>
                1. Загрузка производится автопогрузчиком на поддонах ТОЛЬКО В БОРТОВЫЕ АВТОМОБИЛИ С БОКОВОЙ ЗАГРУЗКОЙ.
                <br/>
                2. Для погрузки необходимо предоставить счет на оплату и квитанцию об оплате.
                <br/>
                3. ВНИМАНИЕ: При заказе любого цвета, в связи с неоднородностью сыпучих материалов добываемых
                на карьерах, технически невозможно получить абсолютно одинаковую цветовую гамму, возможны изменения
                оттенка в светлую и темную сторону.
                <br/>
                4. При укладке бетонных блоков или тротуарной плитки, чтобы добиться лучшего эффекта необходимо
                выполнять укладку сразу с нескольких поддонов.
                <br/>
                <b>5. После монтажа продукции претензии по качеству товара не принимаются</b>
            </div>
        </div>
    );
};

export default EmailCheck;
