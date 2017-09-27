import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, Overlay, Popover} from 'react-bootstrap';
import cn from 'classnames';
import path from 'ramda/src/path';

import styles from './Login.module.css';

const loginDemo = process.env.PUBLIC_URL + '/assets/img/login-demo.png';

const messageByCode = code => {
    switch (code) {
        case 101:
            return 'Неправильная комбинация логин/пароль';

        case 200:
            return 'Введите логин';

        case 201:
            return 'Введите пароль';

        default:
            return 'Что-то пошло не так. Попробуйте позже.'
    }
};

const LoginErrorMessage = ({message, container, target}) => (
    <Overlay placement="top"
             show={true}
             container={container}
             target={target}>
        <Popover id="loginError"
                 title="Ошибка авторизации">
            {message}
        </Popover>
    </Overlay>
);

class Login extends Component {
    formContainer = null;

    state = {
        showError: false
    };

    hideError = () => this.setState({showError: false});

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState(() => ({showError: true}));
        }
    }

    render() {
        const {onSubmit, error} = this.props;
        let code = path(['code'], error);

        return (
            <div className={cn(
                'container-fluid',
                styles.login
            )}>
                <section className={styles.loginContent}>
                    <div className={styles.loginPicture}>
                        <img src={loginDemo} alt="STONETECH.PRO"/>
                    </div>

                    <div className={styles.loginForm}>
                        <Form onSubmit={onSubmit}
                              ref={el => this.formContainer = el}>

                            {(code && this.state.showError) &&
                                <LoginErrorMessage message={messageByCode(code)}
                                                   container={this}
                                                   target={this.formContainer}/>}

                            <h3 className={styles.loginFormTitle}>Панель дилера</h3>

                            <FormGroup className={styles.loginFormGroup}>
                                <FormControl type="text"
                                             name="username"
                                             placeholder="Логин"
                                             bsSize="lg"
                                             className={styles.loginInput}
                                             onChange={this.hideError}/>

                            </FormGroup>

                            <FormGroup className={styles.loginFormGroup}>
                                <FormControl type="text"
                                             name="password"
                                             placeholder="Пароль"
                                             bsSize="lg"
                                             className={styles.loginInput}
                                             onChange={this.hideError}/>
                            </FormGroup>

                            <FormGroup className={styles.loginFormGroup}>
                                <Button type="submit"
                                        bsSize="large"
                                        className={styles.loginSubmit}>
                                    Авторизоваться
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                    <h3 className={styles.loginBrand}>STONETECH.PRO</h3>
                </section>
            </div>
        );
    }
}

export default Login;

