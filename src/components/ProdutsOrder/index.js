import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

const ProdutsOrder = ({total}) => {
    return (
        <Row>
            <Col xs={9}>
                Общая стоимость заказа: {total}
            </Col>

            <Col xs={3}>
                <Button>Оформить</Button>
            </Col>
        </Row>
    );
};

export default ProdutsOrder;
