import React from 'react';
import {Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';

import styles from './Login.module.css';

const Login = ({onSubmit, error}) => {
    return (
        <div className="container login">
            <section className="login-content">
                <div className="login-picture">
                    <img src="/img/login-demo" alt="STONETECH.PRO"/>
                </div>

                <div className="login-form">
                    {error &&
                        <Alert bsStyle="danger">
                            {error.message}
                        </Alert>
                    }

                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <FormControl type="text"
                                         name="username"
                                         placeholder="Логин"/>
                        </FormGroup>

                        <FormGroup>
                            <FormControl type="text"
                                         name="password"
                                         placeholder="Пароль"/>
                        </FormGroup>

                        <Button type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </section>
        </div>
    );
};

export default Login;

