import React from 'react';
import cn from 'classnames';

import ModificationAmount from '../../containers/ModificationAmount';

import productFields from '../../styles/productFields.module.css';
import styles from './Modification.module.css';

const Modification = ({modification}) => {
    return (
        <div className={cn(
            styles.modification,
            productFields.fields
        )}>
            <div className={productFields.nameField}>
                {modification.name}
            </div>
            <div className={productFields.sizeField}>
                {modification.size}
            </div>
            <div className={productFields.weightField}>
                {modification.weight}
            </div>
            <div className={productFields.priceField}>
                {modification.price}
            </div>
            <div className={productFields.quantityField}>
                <ModificationAmount modificationId={modification.objectId}/>
            </div>
        </div>
    );
};

export default Modification;
