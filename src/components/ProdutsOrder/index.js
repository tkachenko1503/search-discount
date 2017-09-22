import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';

class ProdutsOrder extends Component {
    render() {
        const {total} = this.props;

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
    }
}

export default ProdutsOrder;
