import React from 'react';
import cn from 'classnames';

import LoginForm from '../LoginForm';
import Login from '../../containers/Login';

import styles from './Login.module.css';

const loginDemo = process.env.PUBLIC_URL + '/assets/img/login-demo.png';

const LoginPage = () => {
    return (
        <div className={cn(
            'container-fluid',
            styles.login
        )}>
            <section className={styles.loginContent}>
                <div className={styles.loginPicture}>
                    <img src={loginDemo} alt="STONETECH.PRO"/>
                </div>

                <Login as={LoginForm}/>

                <h3 className={styles.loginBrand}>STONETECH.PRO</h3>
            </section>
        </div>
    );
};

export default LoginPage;

