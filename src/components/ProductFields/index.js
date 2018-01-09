import React from 'react';

import productFields from '../../styles/productFields.module.css';

const ProductFields = () => {
    return (
        <div className={productFields.fields}>
            <div className={productFields.nameField}>Название</div>
            <div className={productFields.sizeField}>Размер мм</div>
            <div className={productFields.weightField}>Вес кг/шт</div>
            <div className={productFields.priceField}>Цена. ₽</div>
            <div className={productFields.quantityField}>Кол-во шт.</div>
        </div>
    );
};

export default ProductFields;
