import React from 'react';

import userIcon from '../../assets/user_icon.svg';

import styles from './UserMenu.module.css';

const UserMenu = ({nickname, logout}) => {
    return (
        <div className={styles.menu}>
            <div>
                <img src={userIcon}
                     className={styles.menuUserIcon}/>

                <span className={styles.menuNickname}>
                    {nickname}
                </span>
            </div>
            <div>
                <button className="btn btn-link"
                        onClick={logout}>
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
